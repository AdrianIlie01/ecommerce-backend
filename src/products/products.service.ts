import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Type } from '../shared/type';

@Injectable()
export class ProductsService {
  private stripe: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get(process.env.SK), {
      apiVersion: '2023-10-16',
    });
  }
  async createSession(amount: string) {
    const stripe = new Stripe(process.env.SK);
    console.log(amount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            unit_amount: parseFloat(amount) * 100,
            product_data: {
              name: 'Product Name',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.URL_SUCCESS,
      cancel_url: 'https://example.com/cancel',
    });

    return { url: session.url, sessionId: session.id };
  }

  async findAll() {
    try {
      const products = await ProductEntity.find();
      return products;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getProductsFiltered(type: Type) {
    try {
      console.log(type);

      if (type === 'all-products') {
        return this.findAll();
      }
      const filters = type ? { where: { type } } : {};
      return await ProductEntity.find(filters);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findOne(id: number) {
    try {
      const product = await ProductEntity.findOneBy({
        id: id,
      });
      return product;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findByName(name: string) {
    try {
      console.log(name);
      const product = await ProductEntity.findOne({
        where: {
          name: name,
        },
      });
      return product;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getImageName(name: string) {
    try {
      console.log(name);
      const product = await ProductEntity.findOne({
        where: {
          name: name,
        },
      });

      console.log(product);
      return product.image;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
