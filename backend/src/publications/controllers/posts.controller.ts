import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../../auth/decorators/current-user.decorator';
import type { CurrentUser } from '../../auth/types';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUser() user: CurrentUser,
  ) {
    return this.postsService.create(createPostDto, user.userId);
  }

  @Get()
  findAll(@GetCurrentUser() user: CurrentUser) {
    return this.postsService.findAll(user.userId.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetCurrentUser() user: CurrentUser) {
    return this.postsService.findOne(id, user.userId.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetCurrentUser() user: CurrentUser,
  ) {
    return this.postsService.update(id, updatePostDto, user.userId.toString());
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUser() user: CurrentUser) {
    return this.postsService.remove(id, user.userId.toString());
  }
}
