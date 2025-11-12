/**
 * Link component with View Transitions API support using next-view-transitions
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link as TransitionLink } from 'next-view-transitions'
import type { ComponentProps } from 'react'
import type { UrlObject } from 'url'

// Extend the TransitionLink props to properly accept string hrefs
type LinkProps = Omit<ComponentProps<typeof TransitionLink>, 'href'> & {
  href: string | UrlObject
}

export const Link = forwardRef(function Link(
  props: LinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive as="span">
      <TransitionLink {...(props as ComponentProps<typeof TransitionLink>)} ref={ref} />
    </Headless.DataInteractive>
  )
})
