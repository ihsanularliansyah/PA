import React from 'react';
import { ButtonComponent } from '../base.components';
import { post } from '../../helpers';
import moment from 'moment';
import 'moment/locale/id';
export default function DetailBookingPage({ data }) {
  const formatedDate = moment(data?.event_date)
    .locale('id')
    .format('dddd, DD MMMM YYYY');
  // console.log(formatedDate);
  const message = `*${data.name}*, Kamu telah melakukan booking di inception studio, dengan detail sebagai berikut:\n\n acara: ${data.event_name},\n style: ${data.style},\n pelaksanaan: ${formatedDate}\n\nMimin mau konfirmasi nih apakah detail booking sudah sesuai atau belum.\n\nTerima kasih..`;

  const encodedMessage = encodeURIComponent(message);
  async function sendWaConfirm(chatId) {
    await post({
      url: 'http://localhost:3000/api/sendText',
      contentType: 'application/json',
      body: {
        chatId,
        text: message,
        session: 'default',
      },
    });
  }
  async function sendWaReviewLink(chatId) {
    const message = `Semoga momen berharga anda yang diabadikan kami selalu dikenang dihati/n/n silahkan berikan ulasan mengenai layanan kami melalui link berikut ini: ${
      window.location.origin
    }/review/${data?.Review?.at(0)?.id}`;
    await post({
      url: 'http://localhost:3000/api/sendText',
      contentType: 'application/json',
      body: {
        chatId,
        text: message,
        session: 'default',
      },
    });
  }

  return (
    <div className="flex flex-col px-8 py-4">
      <ul className="space-y-2">
        <li className="grid grid-cols-12">
          <b className="col-span-3">Atas Nama</b>
          <div className="col-span-9">: {data?.name}</div>
        </li>
        <li className="grid grid-cols-12">
          <b className="col-span-3">No. Hp</b>
          <div className="col-span-9">
            :{' '}
            <a
              className="bg-green-600 text-slate-50 px-4 rounded-full"
              target="_blank"
              href={`https://wa.me/+6281216174849?text=${encodedMessage}`}
              rel="noreferrer"
            >
              {data?.phone_number}
            </a>
          </div>
        </li>
        <li className="grid grid-cols-12">
          <b className="col-span-3">Email</b>
          <div className="col-span-9">: {data?.email}</div>
        </li>
        <li className="grid grid-cols-12">
          <b className="col-span-3">Acara</b>
          <div className="col-span-9">: {data?.event_name}</div>
        </li>
        <li className="grid grid-cols-12">
          <b className="col-span-3">Pelaksanaan</b>
          <div className="col-span-9">: {data?.event_date}</div>
        </li>
        <li className="grid grid-cols-12">
          <b className="col-span-3">Status</b>
          <div className="col-span-9">
            :{' '}
            <span
              className={`${
                data?.status == 'done' ? 'bg-primary' : 'bg-slate-400'
              } text-slate-50 px-4 rounded-full`}
            >
              {data?.status}
            </span>
          </div>
        </li>
        <li>
          <b className="block w-full pb-2">Detail : </b>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.detail?.replace(/\n/g, '<br>'),
            }}
            className="max-h-[30vh] overflow-y-scroll scroll_control px-3 py-4 bg-slate-100 rounded-lg"
          ></div>
        </li>
      </ul>
      <div className="w-full flex justify-center mt-10">
        {data.status == 'proceed' && (
          <ButtonComponent
            label="Konfirmasi Booking"
            paint="success"
            onClick={() => sendWaConfirm(data.phone_number)}
          />
        )}
        {data.status == 'done' && (
          <ButtonComponent
            label="Kirim Link Ulasan"
            paint="primary"
            onClick={() => sendWaReviewLink(data.phone_number)}
          />
        )}
      </div>
    </div>
  );
}
