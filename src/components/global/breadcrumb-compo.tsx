import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { Fragment } from 'react';

export default function BreadcrumbComponent() {
  const items = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items?.map((item, index) => (
          <Fragment key={item.title}>
            {index !== items.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator className="hidden md:block"></BreadcrumbSeparator>}
            {index === items.length - 1 && <BreadcrumbPage>{item.title}</BreadcrumbPage>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
