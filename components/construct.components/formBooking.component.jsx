import { ButtonComponent, FormSupervisionComponent } from '../base.components';
import PhoneValidateComponent from './PhoneValidate.component';
import { useRouter } from 'next/router';

function FormBookingComponent() {
  const route = useRouter();
  const { style } = route.query;

  const styleOptions = [
    { label: 'Wedding Photography', value: 'wedding-photography' },
    { label: 'Corporate Videos', value: 'corporate-videos' },
    { label: 'Event Coverage', value: 'event-coverage' },
  ];
  return (
    <div className="min-h-[500px]">
      <FormSupervisionComponent
        submitControl={{ path: 'client-booking' }}
        defaultValue={{ prefix: '62', style: style || '' }}
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
          {
            construction: {
              name: 'event_name',
              label: 'Nama Event',
              placeholder: 'Masukkan event...',
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
            type: 'textarea',
            construction: {
              name: 'detail',
              label: 'Detail',
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
