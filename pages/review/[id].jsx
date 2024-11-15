import prisma from '../../lib/db';
import {
  ButtonComponent,
  FormSupervisionComponent,
} from '../../components/base.components';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { TextareaComponent } from '../../components/base.components/input/Textarea.component';
import StarRating from '../../components/construct.components/StarRatingComponent';
export async function getServerSideProps(context) {
  const { id } = context.params;

  const review = await prisma.review.findUnique({
    where: { id },
    select: {
      id: true,
      comment: true,
      link_status: true,
      rating: true,
      booking: {
        select: {
          event_name: true,
        },
      },
    },
  });

  if (!review) {
    return {
      notFound: true,
    };
  }

  // Mark the review as visited if not already
  return {
    props: { review },
  };
}

const ReviewPage = ({ review }) => {
  return (
    <div className="grid md:grid-cols-11 h-screen ">
      <div className="md:col-span-5 md:col-start-4 bg-white p-10">
        <h1 className="text-3xl font-bold">
          Event: {review?.booking?.event_name}
        </h1>
        <FormSupervisionComponent
          title="Buat Ulasan"
          submitControl={{ path: 'client-review' }}
          confirmation={true}
          defaultValue={{
            id: review?.id,
            comment: review?.comment,
            rating: review?.rating,
            link_status: 'inactive',
          }}
          forms={[
            {
              type: 'custom',
              custom: ({ values, setValues }) => (
                <div
                  className={
                    review?.link_status != 'active' && 'pointer-events-none'
                  }
                >
                  <StarRating
                    name="rating"
                    onRatingSelect={(e) =>
                      setValues([
                        ...values.filter((val) => val.name != 'rating'),
                        { name: 'rating', value: e },
                      ])
                    }
                    ratingValue={
                      values.find((val) => val.name == 'rating')?.value
                    }
                  />
                </div>
              ),
            },
            {
              type: 'custom',
              custom: ({ formControl }) => (
                <div
                  className={
                    review?.link_status != 'active' && 'pointer-events-none'
                  }
                >
                  <TextareaComponent
                    name="comment"
                    label="Ulasan"
                    placeholder="Tuliskan ulasanmu tentang palayayan kami..."
                    rows={12}
                    {...formControl('comment')}
                  />
                </div>
              ),
            },
          ]}
          customActionBar={
            <>
              <div className="flex justify-end mt-4">
                <ButtonComponent
                  type="submit"
                  label="Simpan"
                  icon={faSave}
                  // loading={loading}
                  disabled={review.link_status != 'active'}
                />
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default ReviewPage;
