import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class ScrapPageQueryDTO {
  @IsUrl({}, { message: 'The URL must be valid' })
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  element: string;
}