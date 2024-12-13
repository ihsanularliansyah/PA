import React, { useEffect, useState } from 'react';
import InputImageComponent from '../../components/base.components/input/InputImage.component';
import { useForm } from '../../helpers';
import { AdminLayout } from './Admin.layout';
import {
  ButtonComponent,
  ModalConfirmComponent,
  SelectComponent,
} from '../../components/base.components';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import {
  categoryOptions,
  styleOptions,
} from '../../components/construct.components/formBooking.component';

const Services = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [categorySelected, setCategorySelected] = useState('');
  const [styleSelected, setStyleSelected] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ formControl, submit, loading, setDefaultValues, setValues }] =
    useForm(
      {
        path: `upload`,
        contentType: 'multipart/form-data',
        //   includeHeaders: {
        //     'x-merchant-account': accessActive,
        //   },
      },
      false,
      () => {
        // onUpdate?.();
        setShowConfirm(false);
      }
    );
  useEffect(() => {
    setValues([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, styleSelected]);
  return (
    <>
      <h1 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">
        Manajemen Gallery
      </h1>
      <div className="p-2 rounded-lg bg-white shadow-sm flex gap-4">
        <div>
          <ButtonComponent
            label="Perbarui"
            icon={faRefresh}
            size="sm"
            onClick={() => setShowConfirm(true)}
          />
        </div>
        <SelectComponent
          name="category"
          placeholder="Pilih Event..."
          onChange={(e) => setCategorySelected(e)}
          options={categoryOptions}
          value={categorySelected}
        />
        <SelectComponent
          name="style"
          placeholder="Pilih Style..."
          onChange={(e) => setStyleSelected(e)}
          options={styleOptions}
          value={styleSelected}
        />
      </div>
      <div className="w-full mx-auto mb-10 p-10">
        {categorySelected.length > 0 && styleSelected.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
            <div className="grid gap-4 head">
              <div className="">
                <InputImageComponent
                  aspect={'9/16'}
                  crop
                  cropSize={[220, 400]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-1-1`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'2/3'}
                  crop
                  cropSize={[200, 300]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-1-2`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'16/9'}
                  crop
                  cropSize={[400, 220]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-1-3`
                  )}
                />
              </div>
            </div>
            <div className="grid gap-4 tail">
              <div className="">
                <InputImageComponent
                  aspect={'2/3'}
                  crop
                  cropSize={[200, 300]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-2-1`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'16/9'}
                  crop
                  cropSize={[400, 220]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-2-2`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'9/16'}
                  crop
                  cropSize={[220, 400]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-2-3`
                  )}
                />
              </div>
            </div>
            <div className="grid gap-4 head">
              <div className="">
                <InputImageComponent
                  aspect={'9/16'}
                  crop
                  cropSize={[220, 400]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-3-1`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'2/3'}
                  crop
                  cropSize={[200, 300]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-3-2`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'16/9'}
                  crop
                  cropSize={[400, 220]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-3-3`
                  )}
                />
              </div>
            </div>
            <div className="grid gap-4 tail">
              <div className="">
                <InputImageComponent
                  aspect={'2/3'}
                  crop
                  cropSize={[200, 300]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-4-1`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'16/9'}
                  crop
                  cropSize={[400, 220]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-4-2`
                  )}
                />
              </div>
              <div className="">
                <InputImageComponent
                  aspect={'9/16'}
                  crop
                  cropSize={[220, 400]}
                  {...formControl(
                    `${categorySelected}.${styleSelected}-set.0-4-3`
                  )}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Pilih Event Dan Style Terlebih Dahulu !</p>
        )}
      </div>
      <ModalConfirmComponent
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Perbarui Gallery?"
        onSubmit={submit}
      ></ModalConfirmComponent>
    </>
  );
};

export default Services;
Services.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
