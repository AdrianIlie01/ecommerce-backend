import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.ip = createUserDto.ip;
      user.user_agent = createUserDto.userAgent;
      await user.save();

      console.log('User created successfully');

      return { message: 'User created successfully', user };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findIp(ip: string) {
    try {
      const user = await User.find({
        where: {
          ip: ip,
        },
      });
      return user.length !== 0;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
