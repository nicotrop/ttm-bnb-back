import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hebergements, HebergementsDocument } from './hebergements.schema';
import { Model } from 'mongoose';
import {
  CreateHebergementResponse,
  CreateHebergementsDto,
} from './dto/createHebergements.dto';
import slugify from 'slugify';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getRandomFruitsName = require('random-fruits-name');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uid2 = require('uid2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha256 = require('crypto-js/sha256');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const encBase64 = require('crypto-js/enc-base64');

import { uid2 } from 'uid2';
import { sha256, encBase64 } from 'crypto-js';
import { accessToken } from './dto/accessToken.dto';

@Injectable()
export class HebergementsService {
  constructor(
    @InjectModel(Hebergements.name)
    private hebergementsModel: Model<HebergementsDocument>,
  ) {}

  async create(
    hebergement: CreateHebergementsDto,
  ): Promise<CreateHebergementResponse> {
    if (
      !hebergement.company_name ||
      !hebergement.host_firstname ||
      !hebergement.host_lastname ||
      !hebergement.host_email
    ) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const isUnique = await this.hebergementsModel
      .findOne({
        host_email: hebergement.host_email,
      })
      .exec();

    if (isUnique) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    //Create private code for hebergement
    const code = getRandomFruitsName('fr').split(' ')[0].toLowerCase();
    console.log(code);
    const salt = uid2(16);
    const hash = sha256(code + salt).toString(encBase64);
    const token = uid2(64);

    //Create slug
    const slug = slugify(hebergement.company_name, {
      replacement: '-',
      remove: undefined,
      lower: true,
    });

    //Create hebergement
    const createdHebergement = new this.hebergementsModel({
      company_name: hebergement.company_name,
      host_firstname: hebergement.host_firstname,
      host_lastname: hebergement.host_lastname,
      host_email: hebergement.host_email,
      salt,
      private_code: hash,
      img_url: hebergement.img_url,
      slug,
      token,
    });
    await createdHebergement.save();

    return {
      ...createdHebergement.toObject(),
      code,
    };
  }

  async getAll(): Promise<Hebergements[]> {
    return await this.hebergementsModel.find().exec();
  }

  async findbySlug(slug: string): Promise<Hebergements> {
    if (slug === 'undefined') {
      throw new HttpException('Slug is undefined', HttpStatus.BAD_REQUEST);
    }
    const obj = await this.hebergementsModel
      .findOne({
        slug: slug,
      })
      .exec();

    if (!obj || obj === null) {
      throw new HttpException('Slug not found', HttpStatus.NOT_FOUND);
    }
    return obj;
  }

  async checkCode(slug: string, password: string): Promise<accessToken> {
    const res = await this.findbySlug(slug);
    const proxy = sha256(password + res.salt).toString(encBase64);
    if (proxy === res.private_code) {
      return {
        token: res.token,
      };
    }
    throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
  }
}
