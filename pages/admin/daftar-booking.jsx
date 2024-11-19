import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  ButtonComponent,
  DateFormatComponent,
  FloatingPageComponent,
  FormSupervisionComponent,
  TableSupervisionComponent,
} from '../../components/base.components';
import { AdminLayout } from './Admin.layout';
import PhoneValidateComponent from '../../components/construct.components/PhoneValidate.component';
import DetailBookingPage from '../../components/construct.components/DetailBookingPage';
import { TextareaComponent } from '../../components/base.components/input/Textarea.component';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
function DaftarBooking() {
  const [selected, setSelected] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const route = useRouter();
  const { isAuthenticated, isLoading } = useKindeAuth();
  const categoryOptions = [
    { label: 'Wedding Photography', value: 'wedding-photography' },
    { label: 'Corporate Videos', value: 'corporate-videos' },
    { label: 'Event Coverage', value: 'event-coverage' },
  ];
  const styleOptions = [
    { label: 'moody', value: 'moody' },
    { label: 'tradisional', value: 'tradisional' },
    { lebel: 'clean', value: 'clean' },
    { label: 'modern', value: 'modern' },
    { label: 'vintage', value: 'vintage' },
    { label: 'pastel', value: 'pastel' },
    { label: 'colourful', value: 'colourful' },
  ];
  const statusOptions = [
    { label: 'proceed', value: 'proceed' },
    { label: 'aproved', value: 'aproved' },
    { label: 'done', value: 'done' },
  ];

  useEffect(() => {
    !isLoading && !isAuthenticated && route.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <TableSupervisionComponent
        title="Booking"
        fetchControl={{
          path: 'bookings',
        }}
        setToRefresh={refresh}
        columnControl={{
          customDefaultValue: { prefix: '62' },
          custom: [
            {
              selector: 'name',
              label: 'Atas Nama',
              sortable: true,
              width: '200px',
              item: ({ name, phone_number }) => (
                <>
                  <p className="border-b-2 py-2">{name}</p>
                  <p className="text-sm py-2">Kontak: {phone_number}</p>
                </>
              ),
            },
            {
              selector: 'event_name',
              label: 'Event',
              width: '300px',
              item: ({ event_name }) => (
                <p className="font-semibold">{event_name}</p>
              ),
            },
            {
              selector: 'style',
              label: 'Style',
              width: '200px',
              item: ({ style }) => <p className="">{style}</p>,
            },
            {
              selector: 'status',
              label: 'Status',
              width: '150px',
              item: ({ status }) => (
                <p
                  className={` text-sm font-semibold ${
                    status == 'done'
                      ? 'text-lime-500'
                      : status == 'aproved'
                      ? 'text-yellow-500'
                      : 'text-slate-500'
                  }`}
                >
                  {status}
                </p>
              ),
            },
            {
              selector: 'event_date',
              label: 'Pelaksanaan',
              width: '300px',
              item: ({ event_date }) => (
                <i className="">
                  <DateFormatComponent
                    date={event_date}
                    format="dddd, DD MMMM YYYY"
                  />
                </i>
              ),
            },
          ],
        }}
        formControl={{
          customDefaultValue: { prefix: '62' },
          size: 'lg',
          custom: [
            {
              type: 'date',
              construction: {
                name: 'event_date',
                label: 'Pelaksanaan',
                placeholder: 'Pilih Tanggal Pelaksanaan...',
                validations: {
                  required: true,
                },
              },
            },
            {
              type: 'select',
              construction: {
                name: 'event_name',
                label: 'Event',
                placeholder: 'Pilih Event...',
                options: categoryOptions,
                validations: {
                  required: true,
                },
              },
            },
            {
              type: 'select',
              construction: {
                name: 'style',
                label: 'Style',
                placeholder: 'Pilih Style...',
                options: styleOptions,
                validations: {
                  required: true,
                },
              },
            },
            {
              construction: {
                name: 'name',
                label: 'Nama Pemesan',
                placeholder: 'Masukkan nama pemesan...',
                validations: {
                  required: true,
                },
              },
            },
            {
              col: 6,
              type: 'custom',
              custom: ({ values, setValues, errors, setErrors }) => {
                return (
                  <PhoneValidateComponent
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    isAdmin={true}
                  />
                );
              },
            },
            {
              col: 6,
              construction: {
                type: 'email',
                name: 'email',
                label: 'Email',
                placeholder: 'ex: livia@gmail.com',
                validations: {
                  required: true,
                  email: true,
                },
              },
            },
            {
              type: 'textarea',
              construction: {
                name: 'detail',
                label: 'Detail',
                placeholder: 'detail acara...',
                rows: 4,
                validations: {
                  required: true,
                  min: 10,
                },
              },
            },
          ],
        }}
        customDetail={(data) => {
          return <DetailBookingPage data={data} />;
        }}
        formUpdateControl={{
          customDefaultValue: (data) => {
            return {
              name: data?.name,
              email: data?.email,
              phone_number: data?.phone_number,
              event_name: data?.event_name,
              event_date: data?.event_date,
              style: data?.style,
              detail: data?.detail,
              publish_at: data?.publish_at,
              status: data?.status,
            };
          },
          custom: [
            {
              type: 'date',
              construction: {
                name: 'event_date',
                label: 'Pelaksanaan',
                placeholder: 'Pilih Tanggal Pelaksanaan...',
                validations: {
                  required: true,
                },
              },
            },
            {
              type: 'select',
              construction: {
                name: 'status',
                label: 'Status',
                placeholder: 'Pilih Status...',
                options: statusOptions,
                validations: {
                  required: true,
                },
              },
            },
            {
              type: 'select',
              construction: {
                name: 'event_name',
                label: 'Event',
                placeholder: 'Pilih Event...',
                options: categoryOptions,
                validations: {
                  required: true,
                },
              },
            },
            {
              type: 'select',
              construction: {
                name: 'style',
                label: 'Style',
                placeholder: 'Pilih Style...',
                options: styleOptions,
                validations: {
                  required: true,
                },
              },
            },
            {
              construction: {
                name: 'name',
                label: 'Nama Pemesan',
                placeholder: 'Masukkan nama pemesan...',
                validations: {
                  required: true,
                },
              },
            },
            {
              construction: {
                type: 'email',
                name: 'email',
                label: 'Email',
                placeholder: 'ex: livia@gmail.com',
                validations: {
                  required: true,
                  email: true,
                },
              },
            },
            {
              type: 'textarea',
              construction: {
                name: 'detail',
                label: 'Detail',
                placeholder: 'detail acara...',
                rows: 4,
                validations: {
                  required: true,
                  min: 10,
                },
              },
            },
          ],
        }}
        actionControl={{
          include: (data) => {
            return (
              <>
                <ButtonComponent
                  label="Ulasan"
                  icon={faCommentDots}
                  variant="outline"
                  rounded
                  size="sm"
                  disabled={data?.Review?.at(0)?.link_status == 'active'}
                  onClick={() => {
                    setReviewModal(true);
                    setSelected(data);
                  }}
                />
              </>
            );
          },
        }}
      />
      <FloatingPageComponent
        title={`Ulasan Event ${selected?.event_name}`}
        show={reviewModal}
        onClose={() => {
          setSelected(null);
          setReviewModal(false);
        }}
      >
        <div className="px-6 pt-4 pb-20 h-full overflow-scroll scroll_control">
          <FormSupervisionComponent
            // title="Buat Ulasan"
            submitControl={{ path: 'reviews' }}
            confirmation={true}
            onSuccess={() => {
              setRefresh(!refresh);
              setReviewModal(false);
            }}
            defaultValue={{
              id: selected?.Review?.at(0)?.id,
              comment: selected?.Review?.at(0)?.comment,
              publish_status: selected?.Review?.at(0)?.publish_status,
              link_status: selected?.Review?.at(0)?.link_status,
            }}
            forms={[
              {
                type: 'select',
                construction: {
                  name: 'publish_status',
                  label: 'Tampil Di halaman Utama',
                  placeholder: 'Pilih status..',

                  options: [
                    { label: 'Tampilkan', value: 'publish' },
                    { label: 'Sembunyikan', value: 'unpublish' },
                  ],
                  validations: { required: true },
                },
              },
              {
                type: 'select',
                construction: {
                  name: 'link_status',
                  label: 'Status Link Ulasan',
                  placeholder: 'Pilih status..',
                  options: [
                    { label: 'Aktif', value: 'active' },
                    { label: 'Tidak Aktif', value: 'inactive' },
                  ],
                  validations: { required: true },
                },
              },
              {
                type: 'custom',
                custom: ({ formControl }) => (
                  <TextareaComponent
                    name="comment"
                    label="Ulasan"
                    placeholder="Tuliskan ulasanmu tentang palayayan kami..."
                    rows={12}
                    disabled={true}
                    {...formControl('comment')}
                  />
                ),
              },
            ]}
          />
        </div>
      </FloatingPageComponent>
    </>
  );
}

export default DaftarBooking;
DaftarBooking.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
