import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {FaAsterisk, FaRegStar} from 'react-icons/fa';
import {useMeasure} from '@uidotdev/usehooks';
import {motion, animate, useMotionValue} from 'motion/react';
import {IoStar, IoEllipse} from 'react-icons/io5';
import {TfiArrowTopRight, TfiArrowRight, TfiArrowLeft} from 'react-icons/tfi';
import {FaStar, FaRegStarHalfStroke} from 'react-icons/fa6';
import { p } from 'motion/react-client';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Defines the meta information for the home page, setting the page title.
 * This function is used to provide metadata used by the application for SEO purposes.
 */
/******  7c434c2d-46bb-4bb0-bcba-ae9b5afd395e  *******/ export const meta: MetaFunction =
  () => {
    return [{title: 'Hydrogen | Home'}];
  };
export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <ReviewsPanel />
      <Goals goalsData={data.recommendedProducts} />
      <Supplements Supplements={data.recommendedProducts} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <div
      className="featured-collection-image"
      style={{
        position: 'relative',
        display: 'grid',
        alignItems: 'end',
      }}
    >
      {image && (
        <Image
          data={image}
          sizes="100vw"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      )}
      <div
        style={{
          zIndex: 1,
          display: 'grid',
        }}
      >
        <div>
          <h2
            style={{
              color: 'white',
              fontSize: '55px',
              fontWeight: 'bold',
              padding: '2rem',
              fontFamily: 'sans-serif',
            }}
          >
            Great things never came from comfort zones
          </h2>
        </div>
        <div style={{display: 'flex', alignSelf: 'baseline'}}>
          <button
            style={{
              backgroundColor: '#fff',
              width: '114px',
              height: '42px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Shop Now
          </button>
        </div>
        <BannerAds />
      </div>
    </div>
  );
}

const BannerAds = () => {
  const [ref, {width}] = useMeasure();

  const xTranslation = useMotionValue(0);
  const arrayAds = [
    'High Quality Ingredients',
    'Independently Certified',
    'Expert Driven',
    'Shipped Internationally',
  ];

  useEffect(() => {
    const finalPosition = -(width ?? 0) / 2 - arrayAds.length;

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: 'linear',
      repeat: Infinity,
      duration: 100,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width, arrayAds.length]);

  return (
    <div className="carousel-container">
      <motion.div
        className="carousel-track"
        ref={ref}
        style={{
          x: xTranslation,
        }}
      >
        {[...arrayAds, ...arrayAds, ...arrayAds, ...arrayAds].map(
          (detailKey, idx) => {
            const strWidth =
              detailKey.length >= 20
                ? detailKey.length * 9 + 'px'
                : detailKey.length * 10 + 'px';
            return (
              <div
                className="carousel-card"
                key={detailKey + idx}
                style={{minWidth: strWidth}}
              >
                <FaAsterisk />
                <span style={{marginLeft: '10px'}}>{detailKey} </span>
              </div>
            );
          },
        )}
      </motion.div>
    </div>
  );
};

function ReviewsPanel() {
  const sponsoredReviews = [
    {
      id: 1,
      url: 'app/assets/bbc-news.png ',
    },
    {
      id: 2,
      url: 'app/assets/herb.png ',
    },
    {
      id: 3,
      url: 'app/assets/mens-journal.png ',
    },
    {
      id: 4,
      url: 'app/assets/nytimes.png ',
    },
    {
      id: 5,
      url: 'app/assets/Rolling-Stone.webp ',
    },
    {
      id: 6,
      url: 'app/assets/weekly.png ',
    },
  ];

  return (
    <div className="reviews-panel">
      <div className="reviews-panel-header">
        <div className="review-header"> #1 Doctor Recommended</div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="review-stars">
            {[...Array(5)].map((_, idx) => (
              <IoStar key={idx} style={{marginRight: '3px'}} />
            ))}
          </div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'sans-serif',
            }}
          >
            12,000+ 5-star Reviews
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        {sponsoredReviews.map((review) => (
          <div className="review-div-logo" key={review.id}>
            <img className="review-logo" src={review.url} alt="review" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Goals({
  goalsData,
}: {
  goalsData: Promise<RecommendedProductsQuery | null>;
}) {
  const goals = [
    {
      id: 1,
      name: 'Sleep',
      description: 'Optimize your sleep patterns.',
      image: 'app/assets/GreenWomenscrew01.webp',
      url: 'app/assets/goal1.png ',
    },
    {
      id: 2,
      name: 'Cognitive Function',
      description: "Enhance your brain's performance and connectivity",
      image: 'app/assets/GreenWomenscrew01.webp',
      url: 'app/assets/goal1.png ',
    },
    {
      id: 3,
      name: 'Foundational Health',
      description: 'Promoting healthy, natural deep sleep day to day',
      image: 'app/assets/GreenWomenscrew01.webp',
      url: 'app/assets/goal1.png ',
    },
    {
      id: 4,
      name: 'Athletic Performance',
      description: 'Increase your healthy tissue, muscle, and energy',
      image: 'app/assets/GreenWomenscrew01.webp',
      url: 'app/assets/goal1.png ',
    },
    {
      id: 5,
      name: 'Hormone Support',
      description: 'Boost your mood, libido, and vitality',
      image: 'app/assets/GreenWomenscrew01.webp',
      url: 'app/assets/GreenWomenscrew01.webp',
    },
  ];

  const [zoomedGoalId, setZoomedGoalId] = useState<number | null>(null);
  const [hoverArrowGoalId, sethoverArrowGoalId] = useState<number | null>(null);

  return (
    <div className="col" style={{paddingBottom: '3rem'}}>
      <div
        className="row"
        style={{justifyContent: 'center', padding: '4rem 0 2rem 0'}}
      >
        <div className="col" style={{textAlign: 'center'}}>
          <span style={{fontSize: '16px', fontWeight: '600'}}>
            COMFORTABLY UNCOMFORTABLE
          </span>
          <span style={{fontSize: '41px', fontWeight: 'bold'}}>
            Start with your Goals
          </span>
          <span
            style={{
              color: '#606365',
              width: '65%',
              fontWeight: '600',
              alignSelf: 'center',
            }}
          >
            We cannot become what we want to be by remaining what we are
          </span>
        </div>
      </div>
      <div
        className="row"
        style={{
          justifyContent: 'space-around',
          marginRight: '2rem',
          marginLeft: '2rem',
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={goalsData}>
            {[...goals].map((goal) => (
              <div
                onMouseEnter={() => setZoomedGoalId(goal.id)}
                onMouseLeave={() => setZoomedGoalId(null)}
                className="col"
                key={goal.id}
              >
                <div
                  className={`zoom-image-container ${
                    zoomedGoalId === goal.id ? 'zoomed' : ''
                  }`}
                >
                  <img
                    src={goal.image}
                    alt="goal"
                    style={{
                      width: '350px',
                      height: '440px',
                      transform:
                        zoomedGoalId === goal.id ? 'scale(1.2)' : 'scale(1.15)',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    className={`zoom-image ${
                      zoomedGoalId === goal.id ? 'zoomed' : ''
                    }`}
                  />
                </div>
                <div style={{position: 'relative', marginTop: '1rem'}}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {goal.name}
                  </h3>
                  <p style={{width: '230px'}}>{goal.description}</p>
                  <div
                    className="goals-arrow"
                    onMouseEnter={() => sethoverArrowGoalId(goal.id)}
                    onMouseLeave={() => sethoverArrowGoalId(null)}
                    style={{
                      transition: 'transform 0.3s ease-in-out',
                      backgroundColor:
                        hoverArrowGoalId === goal.id ? '#000' : '',
                      transform:
                        zoomedGoalId === goal.id && hoverArrowGoalId !== goal.id ? 'rotate(45deg)' : '',
                    }}
                  >
                    {hoverArrowGoalId != goal.id && (
                      <TfiArrowTopRight style={{fontSize: '20px'}} />
                    )}
                    {hoverArrowGoalId === goal.id && (
                      <TfiArrowRight
                        className="fadingEffect"
                        style={{
                          fontSize: '20px',
                          color: '#fff',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

function Supplements({
  Supplements,
}: {
  Supplements: Promise<RecommendedProductsQuery | null>;
}) {

  const [supplementsInfo, setSupplementsInfo] = useState(() => {
    const initialSupplementsInfo = [
      {
        id: 1,
        name: 'Omega-3',
        description: 'Supports cognitive function',
        image: 'app/assets/GreenWomenscrew01.webp',
        reviews: 5.0,
        cost: 49.95,
        url: 'app/assets/goal1.png ',
        bestSeller: true,
        tags: [
          {
            id: 1,
            name: 'GMO Free',
          },
          {
            id: 2,
            name: 'Gluten Free',
          },
          {
            id: 3,
            name: 'Vegan',
          },
          {
            id: 4,
            name: 'Dairy Free',
          },
        ],
      },
      {
        id: 2,
        name: 'Magnesium L-Threonate',
        description: 'Enhances the quality of sleep.',
        image: 'app/assets/GreenWomenscrew01.webp',
        reviews: 5.0,
        cost: 49.95,
        url: 'app/assets/goal1.png ',
        bestSeller: false,
        tags: [
          {
            id: 1,
            name: 'GMO Free',
          },
          {
            id: 2,
            name: 'Gluten Free',
          },
        ],
      },
      {
        id: 3,
        name: 'Grass Fed Whey Protein Isolate Powder',
        description: 'Supports muscle mass and strength',
        image: 'app/assets/GreenWomenscrew01.webp',
        reviews: 5.0,
        cost: 49.95,
        url: 'app/assets/goal1.png ',
        bestSeller: false,
        tags: [
          {
            id: 1,
            name: 'GMO Free',
          },
          {
            id: 3,
            name: 'Vegan',
          },
          {
            id: 4,
            name: 'Dairy Free',
          },
        ],
      },
      {
        id: 4,
        name: 'Complete Sleep Bundle',
        description: 'Deepens sleep cycles for rejuvenated mornings',
        image: 'app/assets/GreenWomenscrew01.webp',
        reviews: 5.0,
        cost: 49.95,
        url: 'app/assets/goal1.png ',
        bestSeller: true,
        tags: [
          {
            id: 2,
            name: 'Gluten Free',
          },
          {
            id: 3,
            name: 'Vegan',
          },
          {
            id: 4,
            name: 'Dairy Free',
          },
        ],
      },
    ]; // populate the array here
    const nwwArray = initialSupplementsInfo.map((supplement) => {
      return {...supplement, paymentOption: 'subscribe'};
    });
    console.log(nwwArray);
    return nwwArray;
  });

  const [zoomedSupplementId, setZoomedSupplementId] = useState<number | null>(
    null,
  );

  const [oneTimePurchaseId, setOneTimePurchaseId] = useState<number | null>(
    null,
  );
  const [subscribeAndSaveId, setSubscribeAndSaveId] = useState<number | null>(
    null,
  );
  // const [shoppingList, setShoppingList] = useState([]);

  const handleRadioChange = (
    supplement: any,
    supplementId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
   
  };

  return (
    <div className="col" style={{backgroundColor: '#60636'}}>
      <div
        className="row"
        style={{justifyContent: 'center', padding: '4rem 0 2rem 0'}}
      >
        <div className="col" style={{textAlign: 'center'}}>
          <span style={{fontSize: '16px', fontWeight: '600'}}>🌟 Trending</span>
          <div className="row">
            <div className="col supplements-arrow-box">
              <TfiArrowLeft
                style={{
                  fontSize: '14px',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '41px',
                fontWeight: 'bold',
                marginLeft: '3.5rem',
                marginRight: '3.5rem',
              }}
            >
              Supplements
            </span>
            <div className="col supplements-arrow-box">
              <TfiArrowRight
                style={{
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
          <span
            style={{
              color: '#606365',
              width: '65%',
              fontWeight: '600',
              alignSelf: 'center',
              textDecoration: 'underline',
            }}
          >
            View All
          </span>
        </div>
      </div>
      <div
        className="row"
        style={{
          justifyContent: 'space-around',
          marginRight: '2rem',
          marginLeft: '2rem',
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={Supplements}>
            {[...supplementsInfo].map((supplement) => (
              <div
                onMouseEnter={() => setZoomedSupplementId(supplement.id)}
                onMouseLeave={() => setZoomedSupplementId(null)}
                className="col supplements-container"
                key={supplement.id}
              >
                <div
                  className={`zoom-image-container ${
                    zoomedSupplementId === supplement.id ? 'zoomed' : ''
                  }`}
                >
                  {supplement.bestSeller && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        padding: '6px 10px 6px 10px',
                        backgroundColor: '#ffed92',
                        zIndex: 1,
                      }}
                    >
                      <span>Bestseller</span>
                    </div>
                  )}
                  <img
                    src={supplement.image}
                    alt="goal"
                    style={{
                      width: '350px',
                      height: '440px',
                      transform:
                        zoomedSupplementId === supplement.id
                          ? 'scale(1.2)'
                          : 'scale(1.15)',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                    className={`zoom-image ${
                      zoomedSupplementId === supplement.id ? 'zoomed' : ''
                    }`}
                  />
                </div>
                <div className="row">
                  {supplement.tags.map((tag) => (
                    <div className="supplements-tag" key={tag.id}>
                      <IoEllipse />
                      <span>{tag.name}</span>
                    </div>
                  ))}
                </div>
                <div style={{position: 'relative', marginTop: '1rem'}}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      fontFamily: 'sans-serif',
                    }}
                  >
                    {supplement.name}
                  </h3>
                  <p style={{fontSize: '14px'}}>{supplement.description}</p>
                  <div
                    className="row"
                    style={{marginTop: '1rem', justifyContent: 'space-between'}}
                  >
                    <div className="col">
                      {!!supplement.reviews && (
                        <ReviewsStars rating={supplement.reviews} />
                      )}
                    </div>
                    <div className="col">
                      <div className="row supplements-cost-tag">
                        Add • ${supplement.cost}
                      </div>
                    </div>
                  </div>
                </div>
                {/* {zoomedSupplementId === supplement.id && ( */}
                <div className="col" style={{textAlign: 'center'}}>
                  <div className="row">
                    <div className="row">
                      <div className="col">
                        <div className="row supplements-payment-options ">
                          <div className="col">
                            <input
                              id={'radioOneTime' + supplement.id}
                              type="radio"
                              name={'payment-option-' + supplement.id}
                              value={'oneTime'}
                              checked={supplement.paymentOption === 'oneTime'}
                              onChange={(event) =>
                                handleRadioChange(
                                  supplement,
                                  supplement.id,
                                  event,
                                )
                              }
                            />
                          </div>
                          <div className="col">
                            <span>One-Time Purchase</span>
                            <span>${supplement.cost}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="row supplements-payment-options ">
                          <div className="col">
                            <input
                              id={'radioSubscribe' + supplement.id}
                              type="radio"
                              name={'payment-option-' + supplement.id}
                              value="subscribe"
                              checked={supplement.paymentOption === 'subscribe'}
                              onChange={(event) =>
                                handleRadioChange(
                                  supplement,
                                  supplement.id,
                                  event,
                                )
                              }
                              style={{
                                border: subscribeAndSaveId
                                  ? '1px solid #1B1F23'
                                  : 'none',
                              }}
                            />
                          </div>
                          <div className="col">
                            <span>Subscribe & Save</span>
                            <div className="row">
                              <span>
                                $
                                {(
                                  -(supplement.cost * 0.15) + supplement.cost
                                ).toFixed(2)}
                              </span>
                              <span>Save 10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <button className="supplements-add-to-cart">
                      Add to Card - ${supplement.cost}
                    </button>
                  </div>
                  <div
                    className="row"
                    style={{color: '#1B1F23', fontSize: '12px'}}
                  >
                    View Full Details
                  </div>
                </div>
                {/* )} */}
              </div>
            ))}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

const ReviewsStars = ({rating}: {rating: number}) => {
  const stars = Math.floor(rating);
  const halfStar = rating - stars >= 0.5;

  return (
    <div className="reviews-stars row">
      {[...Array(stars)].map((_, index) => (
        <FaStar key={index} />
      ))}
      {halfStar && <FaRegStarHalfStroke />}
      {[...Array(5 - stars - (halfStar ? 1 : 0))].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
};

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
