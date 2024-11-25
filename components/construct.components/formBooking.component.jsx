import {
  ButtonComponent,
  FormSupervisionComponent,
  InputCheckboxComponent,
  InputComponent,
  InputMapComponent,
  SelectComponent,
} from '../base.components';
import PhoneValidateComponent from './PhoneValidate.component';
import { useRouter } from 'next/router';

function FormBookingComponent() {
  const route = useRouter();
  const { style } = route.query;

  return (
    <div className="min-h-[500px]">
      <FormSupervisionComponent
        submitControl={{ path: 'client-booking' }}
        defaultValue={{ prefix: '62', event_name: style || '' }}
        onSuccess={() => route.push('/')}
        confirmation={true}
        forms={[
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
          // {
          //   construction: {
          //     name: 'event_name',
          //     label: 'Nama Event',
          //     placeholder: 'Masukkan event...',
          //     validations: {
          //       required: true,
          //     },
          //   },
          // },
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
          // {
          //   col: 2,
          //   type: 'select',
          //   construction: {
          //     name: 'prefix',
          //     label: 'Kode Negara',
          //     placeholder: '',
          //     options: [{ label: 'idn (+62)', value: '62' }],
          //     validations: {
          //       required: true,
          //     },
          //   },
          // },
          {
            type: 'custom',
            custom: ({ values, setValues, errors, setErrors }) => {
              return (
                <PhoneValidateComponent
                  values={values}
                  setValues={setValues}
                  errors={errors}
                  setErrors={setErrors}
                />
              );
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
                        {...formControl('properties')}
                        name="properties"
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
              label: 'Detail Acara',
              placeholder: 'detail acara...',
              rows: 4,
              validations: {
                min: 10,
              },
            },
          },
          {
            col: 4,
            construction: {
              name: 'otp',
              label: 'OTP',
              placeholder: 'kode OTP...',
              validations: {
                required: true,
              },
            },
          },
        ]}
        customActionBar={
          <div className="flex justify-end mt-4">
            <ButtonComponent
              type="submit"
              label="Booking"
              size="lg"
              block
              // icon={faSave}
              // loading={loading}
            />
          </div>
        }
      />
    </div>
  );
}

export default FormBookingComponent;
export const categoryOptions = [
  { label: 'Wedding Photography', value: 'wedding-photography' },
  { label: 'Corporate Videos', value: 'corporate-videos' },
  { label: 'Event Coverage', value: 'event-coverage' },
];
const styleOptions = [
  { label: 'moody', value: 'moody' },
  { label: 'tradisional', value: 'tradisional' },
  { label: 'clean', value: 'clean' },
  { label: 'modern', value: 'modern' },
  { label: 'vintage', value: 'vintage' },
  { label: 'pastel', value: 'pastel' },
  { label: 'colourful', value: 'colourful' },
];

export const propertiOPtions = [
  { label: 'Jam Tangan', value: 'Jam-Tangan' },
  { label: 'Topi Bucket', value: 'Topi-Bucket' },
  { label: 'Tas Kecil', value: 'Tas-Kecil' },
  { label: 'Pita Rambut', value: 'Pita-Rambut' },
  { label: 'Topi Fedora', value: 'Topi-Fedora' },
  { label: 'Kacamata Bulat', value: 'Kacamata-Bulat' },
  { label: 'Tas Vintage', value: 'Tas-Vintage' },
  { label: 'Aksesori Mutiara', value: 'Aksesori-Mutiara' },
  { label: 'Clutch Bag', value: 'Clutch-Bag' },
  { label: 'Bros', value: 'Bros' },
  { label: 'Syal Satin', value: 'Syal-Satin' },
  { label: 'Topi Lebar', value: 'Topi-Lebar' },
  { label: 'Kalung Panjang', value: 'Kalung-Panjang' },
  { label: 'Bunga di Rambut', value: 'Bunga-di-Rambut' },
  { label: 'Jam Tangan Minimalis', value: 'Jam-Tangan-Minimalis' },
  { label: 'Kacamata Hitam', value: 'Kacamata-Hitam' },
  { label: 'Perhiasan Tradisional', value: 'Perhiasan-Tradisional' },
  { label: 'Kipas', value: 'Kipas' },
  { label: 'Payung Hias', value: 'Payung-Hias' },
  { label: 'Topi Snapback', value: 'Topi-Snapback' },
  { label: 'Tas Olahraga', value: 'Tas-Olahraga' },
  { label: 'Bola Olahraga', value: 'Bola-Olahraga' },
];
export const dresscodeOptions = [
  { label: 'Tema Kasual Modern', value: 'Kasual-Modern' },
  { label: 'Tema Vintage/Retro', value: 'Vintage-Retro' },
  { label: 'Tema Formal Elegan', value: 'Formal-Elegan' },
  { label: 'Tema Bohemian (Boho)', value: 'Bohemian-Boho' },
  { label: 'Tema Monokrom Minimalis', value: 'Monokrom-Minimalis' },
  { label: 'Tema Tradisional/Adat', value: 'Tradisional-Adat' },
  { label: 'Tema Sporty', value: 'Sporty' },
  { label: 'Tema Glamour', value: 'Glamour' },
  { label: 'Tema Musim (Seasonal Look)', value: 'Musim-Seasonal-Look' },
  { label: 'Tema Karakter atau Cosplay', value: 'Karakter-Cosplay' },
];
