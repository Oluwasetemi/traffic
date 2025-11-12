/**
 * Link component with View Transitions API support using next-view-transitions
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link as TransitionLink } from 'next-view-transitions'
import {type LinkProps} from 'next/link'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive as="span">
      <TransitionLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
