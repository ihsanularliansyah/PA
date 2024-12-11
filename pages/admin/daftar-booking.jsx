import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  ButtonComponent,
  DateFormatComponent,
  FloatingPageComponent,
  FormSupervisionComponent,
  InputCheckboxComponent,
  InputComponent,
  SelectComponent,
  TableSupervisionComponent,
} from '../../components/base.components';
import { AdminLayout } from './Admin.layout';
import PhoneValidateComponent from '../../components/construct.components/PhoneValidate.component';
import DetailBookingPage from '../../components/construct.components/DetailBookingPage';
import { TextareaComponent } from '../../components/base.components/input/Textarea.component';
import { faCommentDots, faReceipt } from '@fortawesome/free-solid-svg-icons';
import {
  categoryOptions,
  dresscodeOptions,
  propertiOPtions,
  styleOptions,
} from '../../components/construct.components/formBooking.component';
import { decryptOtp } from '../../helpers/encryption.helpers';
import InputImageComponent from '../../components/base.components/input/InputImage.component';
import Image from 'next/image';
function DaftarBooking() {
  const [selected, setSelected] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [recieptModal, setRecieptModal] = useState(false);
  const [updateReceipt, setUpdateReceipt] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  const { isAuthenticated, isLoading } = useKindeAuth();
  const statusOptions = [
    { label: 'proceed', value: 'proceed' },
    { label: 'aproved', value: 'aproved' },
    { label: 'done', value: 'done' },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) location.href = '/api/auth/login';
  }, [isLoading, isAuthenticated]);

  return (
    !isLoading &&
    isAuthenticated && (
      <>
        <TableSupervisionComponent
          title="Booking"
          fetchControl={{
            path: 'bookings',
          }}
          setToRefresh={refresh}
          headBar={
            <div className="bg-white p-1.5 rounded-md relative">
              <div className="w-[200px]">
                <SelectComponent
                  name="filter_status"
                  placeholder="Filter status..."
                  options={[{ label: 'Semua', value: '' }, ...statusOptions]}
                  size="sm"
                  // multiple
                  onChange={(e) => setFilterStatus(e)}
                  value={filterStatus}
                />
              </div>
            </div>
          }
          includeFilters={
            filterStatus.length > 0
              ? [
                  {
                    column: 'status',
                    type: 'equal',
                    value: filterStatus,
                  },
                ]
              : undefined
          }
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
                    <p className="text-sm py-2">
                      Kontak: {decryptOtp(phone_number)}
                    </p>
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
                type: 'check',
                construction: {
                  options: [
                    { label: 'Tema Pakaian', value: 'w_dresscode' },
                    { label: 'Properti', value: 'w_property' },
                    { label: 'Lokasi', value: 'w_location' },
                  ],
                  name: 'extras',
                  label: 'Informasi Tambahan (Opsional)',
                },
              },
              {
                type: 'custom',
                custom: ({ formControl, values }) => {
                  return (
                    <div className={`grid grid-cols-12 gap-3`}>
                      {values
                        .find((val) => val.name == 'extras')
                        ?.value.includes('w_dresscode') && (
                        <div className="col-span-12">
                          <SelectComponent
                            {...formControl('dresscode')}
                            name="dresscode"
                            label="Tema Pakaian"
                            placeholder="Pilih Tema Pakaian..."
                            options={dresscodeOptions}
                            validations={{
                              required: true,
                            }}
                          />
                        </div>
                      )}
                      {values
                        .find((val) => val.name == 'extras')
                        ?.value.includes('w_location') && (
                        <div className="col-span-12">
                          <InputComponent
                            {...formControl('location')}
                            name="location"
                            label="Lokasi"
                            placeholder="Masukan Alamat Lengkap..."
                            validations={{
                              required: true,
                            }}
                          />
                        </div>
                      )}
                      {values
                        .find((val) => val.name == 'extras')
                        ?.value.includes('w_property') && (
                        <div className="col-span-12">
                          <InputCheckboxComponent
                            {...formControl('properies')}
                            name="properies"
                            label="Properti"
                            // placeholder="Pilih Tema Pakaian..."
                            options={propertiOPtions}
                            vertical={'h-48'}
                            validations={{
                              required: true,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
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
                    // disabled={data?.Review?.at(0)?.link_status == 'active'}
                    onClick={() => {
                      setReviewModal(true);
                      setSelected(data);
                    }}
                  />
                  <ButtonComponent
                    label="Bukti Bayar"
                    icon={faReceipt}
                    variant="outline"
                    rounded
                    size="sm"
                    // disabled={data?.Review?.at(0)?.link_status == 'active'}
                    onClick={() => {
                      setRecieptModal(true);
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
        <FloatingPageComponent
          title={`Bukti Pembayaran Event ${selected?.event_name}`}
          show={recieptModal}
          onClose={() => {
            setSelected(null);
            setRecieptModal(false);
            setUpdateReceipt(false);
          }}
        >
          <div className="px-6 pt-4 pb-20 h-full overflow-scroll scroll_control">
            {selected?.receipt_path && !updateReceipt ? (
              <>
                <Image
                  src={selected?.receipt_path}
                  width={800}
                  height={800}
                  quality={50}
                  alt={`${selected?.id}-receipt`}
                  className="mx-auto border-2 rounded-lg object-cover"
                />
                <div className="w-full flex justify-center mt-10">
                  <ButtonComponent
                    label="ubah"
                    paint="warning"
                    onClick={() => setUpdateReceipt(true)}
                  />
                </div>
              </>
            ) : (
              <FormSupervisionComponent
                // title="Buat Ulasan"
                submitControl={{
                  path: 'upload-receipt',
                  contentType: 'multipart/form-data',
                }}
                confirmation={true}
                onSuccess={() => {
                  setRefresh(!refresh);
                  setRecieptModal(false);
                  setUpdateReceipt(false);
                }}
                defaultValue={{
                  bookingId: selected?.id,
                }}
                forms={[
                  {
                    type: 'custom',
                    custom: ({ formControl }) => (
                      <div className="w-1/2 mx-auto">
                        <InputImageComponent
                          aspect={'3/2'}
                          {...formControl('receipt')}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </FloatingPageComponent>
      </>
    )
  );
}

export default DaftarBooking;
DaftarBooking.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
