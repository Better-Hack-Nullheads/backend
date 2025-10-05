import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  bio?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Complex nested structure for testing
  profile: {
    personal: {
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      preferences: {
        notifications: {
          email: boolean;
          sms: boolean;
          push: boolean;
        };
        privacy: {
          showEmail: boolean;
          showPhone: boolean;
          showProfile: boolean;
        };
      };
    };
    professional: {
      skills: string[];
      experience: {
        years: number;
        companies: string[];
        achievements: string[];
      };
      certifications: {
        name: string;
        issuer: string;
        date: Date;
        expiry?: Date;
      }[];
    };
  };
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.nextId.toString(),
      ...createUserDto,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        personal: {
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US',
          },
          preferences: {
            notifications: {
              email: true,
              sms: false,
              push: true,
            },
            privacy: {
              showEmail: false,
              showPhone: false,
              showProfile: true,
            },
          },
        },
        professional: {
          skills: [],
          experience: {
            years: 0,
            companies: [],
            achievements: [],
          },
          certifications: [],
        },
      },
    };

    this.nextId++;
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findByRole(role: string): User[] {
    return this.users.filter((user) => user.role === role);
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    return this.users[userIndex];
  }

  remove(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  deactivate(id: string): User | undefined {
    const user = this.findOne(id);
    if (user) {
      user.isActive = false;
      user.updatedAt = new Date();
    }
    return user;
  }

  activate(id: string): User | undefined {
    const user = this.findOne(id);
    if (user) {
      user.isActive = true;
      user.updatedAt = new Date();
    }
    return user;
  }
}
