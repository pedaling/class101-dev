import { Link } from 'gatsby';
import React from 'react';
import { useTranslation } from 'react-i18next';


interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const LinkWithLang: React.FC<Props> = props => {
  const { i18n } = useTranslation();
  const { to, children, className } = props;
  const path = to.startsWith('/') ? `/${i18n.language}${to}` : `/${i18n.language}/${to}`;

  return <Link to={path} className={className}>
    {children}
  </Link>
}
export default LinkWithLang;