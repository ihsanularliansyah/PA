import { useEffect, useRef, useState } from 'react';

import {
  faCamera,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalComponent } from '../modal';
import { ButtonComponent, IconButtonComponent } from '../button';
import AvatarEditor from 'react-avatar-editor';
import { post } from '../../../helpers';

export default function InputImageComponent({
  name,
  label,
  onValidate,
  onChange,
  value,
  disabled,
  aspect,
  uploadUrl,
  error,
  uploadFolder,
  crop,
  cropSize,
  loading,
  register,
}) {
  const [Image, setImage] = useState(false);
  const [ImageValid, setImageValid] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [imageCrop, setImageCrop] = useState(false);
  const [loadingCrop, setLoadingCrop] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      if (onChange && !uploadUrl) {
        setImage(
          value ? (value.type ? URL.createObjectURL(value) : value) : ''
        );
      } else {
        setImage(STORAGE_URL + '/' + value);
      }
    } else {
      setImage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    register?.(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, name]);

  const ImageHndler = async (e) => {
    var image = e.target.files[0];

    const allowedExtension = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg',
    ];

    var isValid = e.target.files[0] && allowedExtension.includes(image.type);

    setImageValid(isValid);

    if (onValidate) {
      onValidate(isValid);
    }

    if (crop) {
      setImageCrop(image);
    } else {
      if (!uploadUrl) {
        setImage(image ? URL.createObjectURL(image) : '');
      }

      if (onChange && !uploadUrl) {
        onChange(e.target.files[0]);
      }

      if (onChange && uploadUrl) {
        const formData = new FormData();

        formData.append('file_image', e.target.files[0]);

        if (uploadFolder) {
          formData.append('folder_name', uploadFolder);
        }

        const upload = await post('admin/hotel/upload-image', formData);

        if (upload?.status == 200) {
          onChange(upload.data.file_name);
          setImage(STORAGE_URL + '/' + upload.data.file_name);
        }
      }
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      inputRef.current.files = e.dataTransfer.files;

      let image = e.dataTransfer.files[0];

      if (!uploadUrl) {
        setImage(image ? URL.createObjectURL(image) : '');
      }
    }
  };

  const [zoom, setZoom] = useState('1');
  const imageRef = useRef();

  const onCropDown = () => {
    if (imageRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = imageRef.current.getImage().toDataURL();
      setTimeout(() => {
        setImage(canvas);
        setImageCrop(false);

        onChange && onChange(dataURLtoFile(canvas, name));

        setLoadingCrop(false); // End loading
      }, 500); // Optional: Add a small delay for effect

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      // const canvasScaled = imageRef.current.getImageScaledToCanvas();
    }
  };

  useEffect(() => {
    setZoom(1);
    if (!imageCrop) {
      inputRef.current.value = null;
    }
  }, [imageCrop]);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  return (
    <>
      <div className="relative">
        {/* <div className='p-4 border-2 border-dashed rounded-xl bg__background'> */}
        <label htmlFor={name} className="cursor-pointer">
          {label && (
            <div
              className={`mb-3 text-sm ml-1 ${
                loading
                  ? 'inline-block skeleton__loading min-w-[80px] mb-1'
                  : ''
              }`}
            >
              {label}
            </div>
          )}
          <div
            // htmlFor={name}
            style={{
              backgroundImage: 'URL(' + Image + ')',
              filter: 'brightness(0.9)',
              aspectRatio: aspect,
            }}
            className={`border-b-[3px] bg-background ${
              dragActive ? 'border-primary' : 'border-gray-300'
            }  text-gray-400 w-full h-full aspect-${
              aspect ? aspect : 'video'
            } relative flex flex-col gap-y-5 justify-center items-center m-auto rounded-lg bg-cover bg-no-repeat ${
              !disabled && 'cursor-pointer '
            } ${!ImageValid && 'outline__danger'} ${
              loading ? 'skeleton__loading' : ''
            }`}
            name={name}
            onDragEnter={handleDrag}
          >
            {!disabled &&
              (Image ? (
                <FontAwesomeIcon className="text-3xl" icon={faCamera} />
              ) : (
                <>
                  <FontAwesomeIcon className="text-3xl" icon={faCamera} />
                  <p className="font-semibold">
                    {dragActive ? 'Letakkan disini' : 'Pilih gambar'}
                  </p>
                </>
              ))}
          </div>
          {/* {!ImageValid && (
              <div className='text__danger mt-3'>
                Image Extension Only (.jpg, .jpeg, .png, .svg)
              </div>
            )} */}
          <input
            ref={inputRef}
            type="file"
            id={name}
            name={name}
            onChange={(e) => ImageHndler(e)}
            className="hidden"
            disabled={disabled}
          />

          {dragActive && (
            <div
              className="absolute w-full h-full top-0 left-0"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </label>

        {(error || !ImageValid) && (
          <div className="mt-2 text-xs font-medium text-red-500">
            {error || 'Warning: Allowable format Image'}
          </div>
        )}
      </div>
      {/* </div> */}

      <ModalComponent
        onClose={() => setImageCrop(false)}
        show={imageCrop}
        title={'Sesuaikan ukuran gambar'}
        footer={
          <div className="flex justify-end">
            <ButtonComponent
              icon={faSave}
              label={'Simpan'}
              bg="primary"
              color={'background'}
              size="sm"
              loading={loadingCrop}
              disabled={loadingCrop}
              onClick={() => {
                setLoadingCrop(true);
                onCropDown();
              }}
            />
          </div>
        }
      >
        <div className="flex justify-center relative">
          {loadingCrop && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
              <div className="loader"></div>{' '}
              {/* Replace with a spinner or loader */}
            </div>
          )}
          <div
            onWheel={(e) =>
              e.deltaY < 0
                ? setZoom(zoom + 0.01)
                : zoom > 1 && setZoom(zoom - 0.01)
            }
          >
            <AvatarEditor
              ref={imageRef}
              image={imageCrop}
              width={cropSize?.at(0) ? cropSize[0] : 200}
              height={cropSize?.at(1) ? cropSize[1] : 200}
              border={[7, 7]}
              color={[255, 255, 255, 0.2]} // RGBA
              scale={+zoom}
              rotate={0}
              style={{
                border: 'dashed',
              }}
              borderRadius={0}
            />
          </div>

          <div className=" absolute bottom-4 left-0 w-full flex justify-start gap-2 px-10">
            <IconButtonComponent
              icon={faMagnifyingGlassPlus}
              variant="light"
              size="lg"
              rounded
              onClick={() => setZoom(zoom + 0.2)}
            />
            <IconButtonComponent
              icon={faMagnifyingGlassMinus}
              variant="light"
              size="lg"
              rounded
              onClick={() => zoom > 1 && setZoom(zoom - 0.2)}
            />
          </div>
        </div>
      </ModalComponent>
    </>
  );
}
