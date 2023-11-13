import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Zigzag() {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState('');

  const handleInputChange = (event: any) => {
    setBookingDate(event.target.value);
  };

  const handleNavigate = () => {
    navigate(`/browse-kamar`);
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className=" border-gray-800 py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="m-2 mb-4 inline-flex rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
              Hotel nomor #1 terbaik Asia Tenggara menurut PBB
            </div>
            <h1 className="h2 mb-4">Grand Atma Hotel</h1>
            <p className="text-xl text-gray-400">
              Banyak sekali fasilitas di Grand Atma Hotel yang sangat menarik
              bagi para tamu yang menginap di hotel kami
            </p>
          </div>

          <div className="max-w mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="flex items-center justify-between rounded-lg bg-slate-800 p-8">
              <div>
                <h1 className="mb-4 text-2xl font-bold">Ingin Menginap?</h1>
                <p className="mb-6 text-lg text-gray-400">
                  Silahkan masukkan tanggal booking di bawah ini:
                </p>
              </div>
              <div>
                <Button
                  className="max-w ml-4 mt-4"
                  size="lg"
                  onClick={handleNavigate}
                >
                  Pesan Sekarang
                </Button>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <img
                  className="mx-auto h-auto max-w-full md:max-w-none"
                  src="https://cdn0-production-images-kly.akamaized.net/oSgflu88GES_yPHxHhW2S6owtCE=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
                  width={540}
                  height={405}
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter mb-2 text-xl text-purple-400">
                    Tidur nyenyak dengan banyak hiburan
                  </div>
                  <h3 className="h3 mb-3">
                    Kami Menghadirkan fasilitas mutakhir
                  </h3>
                  <p className="mb-4 text-xl text-gray-400">
                    Banyak fasilitas yang tersedia seperti:
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Wifi Kamar</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>AC Kamar</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Breakfast dan Message dari terapis terkenal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="rtl mx-auto mb-8 max-w-xl md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <img
                  className="mx-auto h-auto max-w-full md:max-w-none"
                  src="https://cdn0-production-images-kly.akamaized.net/oSgflu88GES_yPHxHhW2S6owtCE=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
                  width={540}
                  height={405}
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter mb-2 text-xl text-purple-400">
                    Dengan jenis kamar yang beragam
                  </div>
                  <h3 className="h3 mb-3">
                    Jenis Kamar yang lengkap dan memadai
                  </h3>
                  <p className="mb-4 text-xl text-gray-400">
                    Berikut beberapa jenis kamar yang tersedia di hotel kami
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Double Bed King</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>King size </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Triple bed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <img
                  className="mx-auto h-auto max-w-full md:max-w-none"
                  src="https://cdn0-production-images-kly.akamaized.net/oSgflu88GES_yPHxHhW2S6owtCE=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
                  width={540}
                  height={405}
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter mb-2 text-xl text-purple-400">
                    Kami Menyediakan beberapa fasilitas
                  </div>
                  <h3 className="h3 mb-3">
                    Beberapa fasilitas hotel yang dapat disewa
                  </h3>
                  <p className="mb-4 text-xl text-gray-400">
                    Kami memberikan beberapa persewaan gedung untuk pertemuan
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Sewa gedung mulai dari 1 juta per hari</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Ballroom yang luas</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Beberapa kolam renang pribadi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
