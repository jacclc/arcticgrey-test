import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {BsInstagram, BsTwitter, BsYoutube} from 'react-icons/bs';
import {FaHeart} from "react-icons/fa";
import {FaFacebookF} from 'react-icons/fa6';
import {BiSolidCoffee} from 'react-icons/bi';
import {PiCopyright} from 'react-icons/pi';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const socialMedia = [
    {
      name: 'Instagram',
      url: 'https://www.nstagram.com/',
    },
    {
      name: 'Twitter',
      url: 'https://www.twitter.com/',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/',
    },
  ];

  const aboutUs = [
    {
      name: 'Blog',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Product Reviews',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Our Story',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Delivery',
      url: 'https://www.uncmfrt.com/',
    },
  ];

  const support = [
    {
      name: 'Order Status',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Help Center',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Contact Us',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Returns',
      url: 'https://www.uncmfrt.com/',
    },
  ];

  const importantLink = [
    {
      name: 'Maintenance',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Warranty',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Canadian Customers',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Setup',
      url: 'https://www.uncmfrt.com/',
    },
  ];

  const legal = [
    {
      name: 'Privacy Policy',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Accessibility',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Terms of Service',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Affiliate Program',
      url: 'https://www.uncmfrt.com/',
    },
    {
      name: 'Articles',
      url: 'https://www.uncmfrt.com/',
    },
  ];

  return (
    <Suspense>
      <Await resolve={footerPromise}>
        <footer className="footer">
          <div className="row">
            <div className="col footer-subscribe">
              <h2
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                Be a Part of Our Journey
              </h2>
              <p style={{marginBottom: '2rem', width: '60%'}}>
                Welcome to UNCMFRT. Sign up for exclusive content and we'll send
                you 10% off.
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="footer-subscribe-input"
                />
                <button className="footer-subscribe-button">Subscribe</button>
              </div>
            </div>
            <div className="col footer-links">
              <div className="row" style={{justifyContent: 'space-around'}}>
                <div className="col">
                  <h3
                    style={{
                      marginBottom: '0.9rem',
                      fontWeight: '700',
                      fontSize: '18px',
                    }}
                  >
                    About Us
                  </h3>
                  {aboutUs.map((link: any) => (
                    <div
                      key={link.name}
                      style={{marginBottom: '0.7rem', fontWeight: '600'}}
                    >
                      {link.url && <NavLink to={link.url}>{link.name}</NavLink>}
                    </div>
                  ))}
                </div>
                <div className="col">
                  <h3
                    style={{
                      marginBottom: '0.9rem',
                      fontWeight: '700',
                      fontSize: '18px',
                    }}
                  >
                    Support
                  </h3>
                  {support.map((link: any) => (
                    <div
                      key={link.name}
                      style={{marginBottom: '0.7rem', fontWeight: '600'}}
                    >
                      {link.url && <NavLink to={link.url}>{link.name}</NavLink>}
                    </div>
                  ))}
                </div>
                <div className="col">
                  <h3
                    style={{
                      marginBottom: '0.9rem',
                      fontWeight: '700',
                      fontSize: '18px',
                    }}
                  >
                    Important Link
                  </h3>
                  {importantLink.map((link: any) => (
                    <div
                      key={link.name}
                      style={{marginBottom: '0.7rem', fontWeight: '600'}}
                    >
                      {link.url && <NavLink to={link.url}>{link.name}</NavLink>}
                    </div>
                  ))}
                </div>
                <div className="col">
                  <h3
                    style={{
                      marginBottom: '0.9rem',
                      fontWeight: '700',
                      fontSize: '18px',
                    }}
                  >
                    Legal
                  </h3>
                  {legal.map((link: any) => (
                    <div
                      key={link.name}
                      style={{marginBottom: '0.7rem', fontWeight: '600'}}
                    >
                      {link.url && <NavLink to={link.url}>{link.name}</NavLink>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col footer-contact-us">
              <h3
                style={{
                  marginBottom: '1rem',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                Contact Us
              </h3>
              <span>Let Us Help You</span>
              <span
                style={{
                  marginBottom: '1.5rem',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  fontFamily: 'system-ui',
                }}
              >
                (888) 860-0572
              </span>
              <span style={{marginBottom: '1rem', fontWeight: 'bold'}}>
                Connect With Us
              </span>
              <div
                className="row"
                style={{justifyContent: 'space-between', width: '54%'}}
              >
                {socialMedia.map((sm: any) => (
                  <div key={sm.name}>
                    {sm.url && (
                      <>
                        {sm.name === 'Instagram' && <BsInstagram />}
                        {sm.name === 'Twitter' && <BsTwitter />}
                        {sm.name === 'Facebook' && <FaFacebookF />}
                        {sm.name === 'Youtube' && (
                          <BsYoutube style={{fontSize: '19px'}} />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row footer-copyright">
            <div
              className="col"
              style={{textAlign: 'left', display: 'contents'}}
            >
              <div className="row">
                <PiCopyright
                  style={{
                    alignSelf: 'center',
                    color: '#888a8c',
                    fontWeight: 'bold',
                  }}
                />
                <span
                  style={{
                    color: '#888a8c',
                    fontWeight: '600',
                    marginLeft: '3px',
                  }}
                >
                  uncmfrt.com. All right reserved.
                </span>
              </div>
            </div>
            <div
              className="col"
              style={{textAlign: 'right', display: 'contents'}}
            >
              <div
                className="row"
                style={{
                  color: '#888a8c',
                  fontWeight: '600',
                  marginLeft: '3px',
                }}
              >
                <span>Made with</span>
                <FaHeart
                  style={{
                    color: '#000',
                    alignSelf: 'center',
                    marginLeft: '3px',
                    marginRight: '3px',
                    fontSize: '12px',
                  }}
                />
                <span>and</span>
                <BiSolidCoffee
                  style={{
                    color: '#000',
                    alignSelf: 'center',
                    marginLeft: '3px',
                    marginRight: '3px',
                  }}
                />
                <span>by Arctic Grey</span>
              </div>
            </div>
          </div>
        </footer>
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
