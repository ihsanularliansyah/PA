import React, { useState } from 'react';
import InputImageComponent from '../../components/base.components/input/InputImage.component';
import { useForm } from '../../helpers';
import { AdminLayout } from './Admin.layout';
import {
  ButtonComponent,
  ModalConfirmComponent,
} from '../../components/base.components';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

const Portofolio = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [{ formControl, submit, loading, setDefaultValues }] = useForm(
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
  return (
    <>
      <h1 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4">
        Manajemen Portofolio
      </h1>
      <div className="p-2 rounded-lg bg-white shadow-sm">
        <ButtonComponent
          label="Perbarui"
          icon={faRefresh}
          size="sm"
          onClick={() => setShowConfirm(true)}
        />
      </div>
      <div className="w-full mx-auto mb-10 p-10">
        {[1].map((i) => {
          return (
            <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
              <div className="grid gap-4 head">
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[220, 400]}
                    {...formControl('portofolio-set.0-1-1')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[200, 300]}
                    {...formControl('portofolio-set.0-1-2')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 220]}
                    {...formControl('portofolio-set.0-1-3')}
                  />
                </div>
              </div>
              <div className="grid gap-4 tail">
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[200, 300]}
                    {...formControl('portofolio-set.0-2-1')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 220]}
                    {...formControl('portofolio-set.0-2-2')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[220, 400]}
                    {...formControl('portofolio-set.0-2-3')}
                  />
                </div>
              </div>
              <div className="grid gap-4 head">
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[220, 400]}
                    {...formControl('portofolio-set.0-3-1')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[200, 300]}
                    {...formControl('portofolio-set.0-3-2')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 220]}
                    {...formControl('portofolio-set.0-3-3')}
                  />
                </div>
              </div>
              <div className="grid gap-4 tail">
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[200, 300]}
                    {...formControl('portofolio-set.0-4-1')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 220]}
                    {...formControl('portofolio-set.0-4-2')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[220, 400]}
                    {...formControl('portofolio-set.0-4-3')}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ModalConfirmComponent
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Perbarui Portofolio "
        onSubmit={submit}
      ></ModalConfirmComponent>
    </>
  );
};

export default Portofolio;
Portofolio.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
