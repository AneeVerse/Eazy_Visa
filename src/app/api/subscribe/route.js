// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../../../lib/dbConnect';

// Define Subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Create model if it doesn't exist
let Subscriber;
try {
  Subscriber = mongoose.model('Subscriber');
} catch {
  Subscriber = mongoose.model('Subscriber', subscriberSchema);
}

export const POST = async (req) => {
  try {
    await dbConnect();

    const { email, name } = await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email is required!' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please enter a valid email address' 
        },
        { status: 400 }
      );
    }

    // Check for existing subscriber
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { 
          success: false,
          message: 'This email is already subscribed' 
        },
        { status: 409 }
      );
    }

    // Create new subscriber
    const newSubscriber = await Subscriber.create({
      email,
      ...(name && { name }) // Only include name if provided
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Subscription successful!',
        data: {
          email: newSubscriber.email,
          name: newSubscriber.name
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'An error occurred during subscription'
      },
      { status: 500 }
    );
  }
};