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
  Header,
  Req,
} from '@nestjs/common';
import { auth } from '../lib/auth.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import {fromNodeHeaders} from "better-auth/node";
@Controller('autodoc')
export class AutodocController {
  @AllowAnonymous()
  @Post('register')
  async register(@Body() dto: {
    email: string;
    password: string;
    projectName: string;
  }) {
    try {
      const hasAdmin = await this.hasAdmin();
      console.log(hasAdmin)
      const userRole = hasAdmin ? 'user' : 'admin';

      const user = await auth.api.createUser({
        body: {
          email: dto.email,
          password: dto.password,
          name: dto.projectName,
          role:userRole
          
          
        }
       
      });

      return { 
        success: true, 
        message: hasAdmin 
          ? 'User account created successfully' 
          : 'Admin account created successfully',
        role: userRole 
      };

    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    }
  }

private async hasAdmin(): Promise<boolean> {
  try {
    const adminUser = await auth.api.listUsers({
      query: {
        filterField: "role",
        filterValue: "admin",
        filterOperator: "eq",
        limit: 1
      }
    });
    
    if (!adminUser) {
      console.log('adminUser is null/undefined');
      return false;
    }
    
    if (!adminUser.users) {
      console.log('adminUser.users is null/undefined');
      return false;
    }
    
    console.log('Admin users found:', adminUser.users.length);
    return adminUser.users.length > 0;
    
  } catch (error) {
    console.error('Error checking for admin:', error);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    return false;
  }
}
@AllowAnonymous()
  @Post('login')
  async login(
    @Body() dto: {
      email: string;
      password: string;
    },
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const session = await auth.api.signInEmail({
        body: {
          email: dto.email,
          password: dto.password,
        },
        headers: fromNodeHeaders(req.headers)
      });

    
      
   
        const isAdmin = await this.isUserAdmin(session.user.id);
        const userRole = isAdmin ? 'admin' : 'user';
    

      return {
        success: true,
        message: 'Login successful',
        session: session.token,
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: userRole
        }
      };

    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Invalid email or password'
      );
    }
  }

    private async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const users = await auth.api.listUsers({
        query: {
          filterField: "id",
          filterValue: userId,
          filterOperator: "eq",
          limit: 1
        }
      });

      if (users && users.users.length > 0) {
        const user = users.users[0];
        return user.role === 'admin';
      }

      return false;
    } catch (error) {
      console.error('Error checking if user is admin:', error);
      return false;
    }
  }
  }
