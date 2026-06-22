import React from "react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children, "data-collection-item-id": __dataCollectionItemId }) {
  return (
    <div data-source-location="components/AuthLayout:5:4" data-dynamic-content="true" className="min-h-screen flex items-center justify-center bg-background px-4" data-collection-item-id={__dataCollectionItemId}>
      <div data-source-location="components/AuthLayout:6:6" data-dynamic-content="true" className="w-full max-w-md">
        <div data-source-location="components/AuthLayout:7:8" data-dynamic-content="true" className="text-center mb-10">
          <div data-source-location="components/AuthLayout:8:10" data-dynamic-content="false" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
            <Icon data-source-location="components/AuthLayout:9:12" data-dynamic-content="false" className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 data-source-location="components/AuthLayout:11:10" data-dynamic-content="true" className="text-3xl font-bold tracking-tight text-foreground" data-collection-item-field="title" data-collection-item-id={__dataCollectionItemId}>{title}</h1>
          {subtitle && <p data-source-location="components/AuthLayout:12:23" data-dynamic-content="true" className="text-muted-foreground mt-2" data-collection-item-field="subtitle" data-collection-item-id={__dataCollectionItemId}>{subtitle}</p>}
        </div>
        <div data-source-location="components/AuthLayout:14:8" data-dynamic-content="true" className="bg-card rounded-2xl shadow-sm border border-border p-8">
          {children}
        </div>
        {footer &&
        <p data-source-location="components/AuthLayout:18:10" data-dynamic-content="true" className="text-center text-sm text-muted-foreground mt-6" data-collection-item-field="footer" data-collection-item-id={__dataCollectionItemId}>{footer}</p>
        }
      </div>
    </div>);

}