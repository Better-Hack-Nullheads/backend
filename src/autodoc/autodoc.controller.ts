// src/autodoc/autodoc.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Headers,
  HttpStatus,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { auth } from '../lib/auth.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('autodoc')
export class AutodocController {
  @AllowAnonymous()
  @Post('register')
  async register(
    
    @Body() dto: { email: string; password: string; companyName: string }
  ) {
    try {
      const userResult = await auth.api.signUpEmail({
        body: {
          email: dto.email,
          password: dto.password,
          name: dto.companyName,
        },
      });

      const user = userResult.user;

      const orgResult = await auth.api.createOrganization({
        body: {
          name: dto.companyName,
          slug: dto.companyName.toLowerCase().replace(/\s+/g, '-'),
          userId: user.id,
        },
        headers:{}
      });

      const org = orgResult 

      const apiKeyResult = await auth.api.createApiKey({
        body: {
          name: `${dto.companyName} Owner Key`,
          userId: user.id,
          metadata: {
            organizationId: org?.id,
            role: 'owner',
          },
          permissions: {
            endpoints: ['read', 'write', 'delete'],
          },
          expiresIn: null,
          rateLimitEnabled: false,
        },
      });

      return {
        success: true,
        apiKey: apiKeyResult.key,
        organizationId: org?.id,
        userId: user.id,
      };
    } catch (err: any) {
      console.error('[AutoDoc] Registration error:', err);
      return {
        success: false,
        message: err.message || 'Registration failed',
      };
    }
  }

  @Post('invite')
  async inviteMember(
    @Headers('x-api-key') apiKey: string,
    @Body() dto: { email: string; role: 'admin' | 'member' }
  ) {
    const verification = await auth.api.verifyApiKey({
      body: { key: apiKey },
    });

    if (!verification.valid) {
      throw new UnauthorizedException('Invalid API key');
    }

    const orgId = verification.key?.metadata?.organizationId;

    const inviteResult = await auth.api.createInvitation({
      body: {
        email: dto.email,
        role: dto.role,
        organizationId: orgId,
      },
    });

    return {
      success: true,
      invitationId: inviteResult.id,
      inviteUrl: `${process.env.FRONTEND_URL}/autodoc/accept-invite?id=${inviteResult.id}`,
      message: 'Invitation created. Send the invite URL to the user.',
    };
  }

  @Get('accept-invite')
  async showAcceptInvite(
    @Query('id') invitationId: string,
    @Res() res: any
  ) {
    const inv = await auth.api.getInvitation({
      query: { id: invitationId },
      headers:{}
    });

    if (!inv) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Invalid or expired invitation');
    }

    // render your HTML form like before, using inv fields
    return res.status(HttpStatus.OK).send(`
      <!DOCTYPE html>
      <html>
        <!-- form HTML here (same as your previous) -->
      </html>
    `);
  }

  @Post('accept-invite')
  async acceptInvite(
    @Body() dto: {
      invitationId: string;
      password: string;
      name: string;
      email: string;
    }
  ) {
    try {
      const inv = await auth.api.getInvitation({
        query: { id: dto.invitationId },
        headers:{}
      });
      if (!inv) {
        return { success: false, message: 'Invalid invitation' };
      }

      // Create user
      const userResult = await auth.api.signUpEmail({
        body: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
        },
      });
      const user = userResult.user;

      // Accept invitation: passing headers of a authenticated session
      await auth.api.acceptInvitation({
        body: { invitationId: dto.invitationId },
        headers: { authorization: `Bearer ${user.id}` }, // server side style
      });

      const permissions =
        inv.role === 'admin'
          ? { endpoints: ['read', 'write', 'delete'] }
          : { endpoints: ['read'] };

      const apiKeyResult = await auth.api.createApiKey({
        body: {
          name: `${dto.name} ${inv.role} Key`,
          userId: user.id,
          metadata: {
            organizationId: inv.organizationId,
            role: inv.role,
          },
          permissions,
          expiresIn: null,
          rateLimitEnabled: false,
        },
      });

      return {
        success: true,
        apiKey: apiKeyResult.key,
        role: inv.role,
        organizationId: inv.organizationId,
      };
    } catch (err: any) {
      console.error('[AutoDoc] Accept invite error:', err);
      return { success: false, message: err.message };
    }
  }

  @Get('members')
  async listMembers(@Headers('x-api-key') apiKey: string) {
    const verification = await auth.api.verifyApiKey({
      body: { key: apiKey },
    });
    if (!verification.valid) {
      throw new UnauthorizedException('Invalid API key');
    }
const orgId = verification.key?.metadata?.organizationId;

if (!orgId) {
  throw new UnauthorizedException('Organization ID missing in API key metadata');
}

    const members = await auth.api.listMembers({
      query: { organizationId: orgId },
    });

    return { success: true, members };
  }

  @Get('endpoints')
  async getEndpoints(@Headers('x-api-key') apiKey: string) {
    const verification = await auth.api.verifyApiKey({
      body: { key: apiKey, permissions: { endpoints: ['read'] } },
    });
    if (!verification.valid) {
      throw new UnauthorizedException('Invalid API key or insufficient permissions');
    }

    return {
      endpoints: [
        { path: '/users', method: 'GET' },
        { path: '/users', method: 'POST' },
      ],
    };
  }

  @Post('endpoints/:id/description')
  async updateDescription(
    @Headers('x-api-key') apiKey: string,
    @Body() dto: { description: string }
  ) {
    const verification = await auth.api.verifyApiKey({
      body: { key: apiKey, permissions: { endpoints: ['write'] } },
    });
    if (!verification.valid) {
      throw new UnauthorizedException('Admin access required');
    }

    // TODO: update description in your own DB or metadata store

    return { success: true, message: 'Description updated' };
  }
}
