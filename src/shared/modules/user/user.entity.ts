import {UserType} from '../../types/index.js';
import {UserEnum} from '../../types/enums.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions(
  {
    schemaOptions: {
      timestamps: true,
      collection: 'users'
    }
  }
)
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements UserType{
  @prop({required: true, trim: true, minlength: 1, maxlength: 15, default: ''})
  public name: string;

  @prop({required: true, trim: true, unique: true, default: ''})
  public email: string;

  @prop({trim: true, default: 'https://15.design.htmlacademy.pro/static/avatar/8.jpg'})
  public avatarPath?: string;

  @prop({required: true, trim: true, minlength: 6, maxlength: 12, default: ''})
  public password: string;

  @prop({required: true, enum: UserEnum, default: ''})
  public type: UserEnum;

  constructor(userData: UserType) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.password = userData.password;
    this.type = userData.type;
  }

  public setPassword (password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword () {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
