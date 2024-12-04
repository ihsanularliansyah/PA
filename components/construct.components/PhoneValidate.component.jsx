import React, { useEffect, useState } from 'react';
import { InputComponent, SelectComponent } from '../base.components';
import { get, post } from '../../helpers';

function PhoneValidateComponent({
  values,
  setValues,
  errors,
  setErrors,
  isAdmin,
}) {
  const [inputPhone, setInputPhone] = useState('');
  const [checkValidate, setCheckValidate] = useState(false);
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [activeNumber, setActiveNumber] = useState(false);
  const prefix = values.find((val) => val.name == 'prefix')?.value;

  useEffect(() => {
    if (inputPhone != undefined) {
      const delayCheck = setTimeout(() => {
        setCheckValidate(!checkValidate);
      }, 2000);
      return () => clearTimeout(delayCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPhone]);

  async function checkPhone() {
    if (inputPhone?.length > 5) {
      setActiveNumber(false);
      setLoadingValidate(true);
      const pingResponse = await get({
        url: `http://localhost:3000/api/contacts/check-exists?phone=${
          prefix + inputPhone
        }&session=default`,
      });
      if (pingResponse?.status == 200) {
        setLoadingValidate(false);
        // console.log(pingResponse?.data?.numberExists);
      }
      if (pingResponse?.data?.numberExists) {
        setValues([
          ...values?.filter(
            (val) => !['phone_number', 'validNumber'].includes(val.name)
          ),
          { name: 'phone_number', value: inputPhone },
          { name: 'validNumber', value: 1 },
        ]);

        setErrors([
          ...errors?.filter((val) => !['phone_number'].includes(val.name)),
        ]);

        if (!isAdmin) {
          sendOtp();
          setCooldown(60);
        }

        setActiveNumber(true);
      } else {
        setErrors([
          ...errors?.filter((val) => !['phone_number'].includes(val.name)),
          { name: 'phone_number', error: 'nomor WhatsApp tidak ada' },
        ]);

        setValues([
          ...values?.filter((val) => !['validNumber'].includes(val.name)),
        ]);
      }
    }
    // setValues([
    //   ...values?.filter(
    //     (val) => !['phone_number', 'validNumber'].includes(val.name)
    //   ),
    //   { name: 'phone_number', value: inputPhone },
    //   { name: 'validNumber', value: 1 },
    // ]);
  }

  async function sendOtp() {
    await post({
      url: 'http://localhost:3001/api/guard',
      contentType: 'application/json',
      body: {
        phone_number: prefix + inputPhone,
      },
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cooldown > 0) {
        setCooldown(cooldown - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldown]);

  useEffect(() => {
    checkPhone();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidate]);

  //   console.log(values.find((val) => val.name == 'phone_number')?.value);
  return (
    <>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-2">
          <SelectComponent
            name="prefix"
            label="Kode Negara"
            options={[{ label: 'Idn (+62)', value: '62' }]}
            validations={{ required: true }}
            onChange={(e) =>
              setValues([
                ...values?.filter((val) => val.name != 'prefix'),
                { name: 'prefix', value: e },
              ])
            }
            value={values.find((val) => val.name == 'prefix')?.value}
            error={errors.find((val) => val.name == 'prefix')?.error}
          />
        </div>
        <div className="col-span-4">
          <InputComponent
            type="tel"
            name="phone_number"
            label={loadingValidate ? 'No. Hp (cek nomor...)' : 'No. Hp'}
            placeholder="Ex:895396025318"
            validations={{ required: true }}
            onChange={(e) => {
              setInputPhone(e);
            }}
            value={values.find((val) => val.name == 'phone_number')?.value}
            // error={errors.find((val) => val.name == 'phone_number')?.error}
            disabled={cooldown}
          />
          {!errors.find((val) => val.name == 'phone_number')?.error &&
            inputPhone.length > 5 &&
            activeNumber && (
              <small className="h-4 text-green-600">
                {'nomor WhatsApp ditemukan'}
                {cooldown > 0 && ` (${cooldown})`}
              </small>
            )}
          {errors.find((val) => val.name == 'phone_number')?.error && (
            <small className="h-4 text-red-600">
              {!loadingValidate
                ? 'nomor WhatsApp tidak ditemukan'
                : 'cek nomor...'}
            </small>
          )}
        </div>
      </div>
    </>
  );
}

export default PhoneValidateComponent;
