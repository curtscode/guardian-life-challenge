'use client'

import { Client } from '@/types/Client';

type ClientDetailProps = {
  featuredPerson: Client;
}

export default function ClientDetail({featuredPerson}: ClientDetailProps) {

  return (
      <>
        <h2 className="text-black font-bold">Policy Details: {featuredPerson.firstName} {featuredPerson.lastName}</h2>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">First</dt>
            <dd className="text-gray-900">{featuredPerson.firstName}</dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Last</dt>
            <dd className="text-gray-900">{featuredPerson.lastName}</dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Email</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.email}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Phone</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.phone}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-medium text-gray-600">Birthdate</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.birthDate}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Policy Number</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.policyNumber}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Coverage Amount</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.coverageAmount}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Permium</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.premium}</a></dd>
          </dl>
        </div>
        <div className="odd:bg-white even:bg-gray-100">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <dt className="font-bold text-gray-600">Address</dt>
            <dd className="text-gray-900"><a href="mailto:bob.robertson@example.com">{featuredPerson.address}</a></dd>
          </dl>
        </div>
      </>
  );
}
