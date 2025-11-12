'use client'

import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Disclaimer } from '../components/ui/disclaimer'
import {
  GlobeAltIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

export default function PaymentPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <Heading>How to Pay Traffic Tickets</Heading>
          <Text className="mt-2">
            Multiple convenient options to pay your traffic fines in Jamaica
          </Text>
        </div>

        {/* Important Timeline */}
        <div className="mb-12 rounded-2xl bg-red-50 dark:bg-red-950/20 p-6 border border-red-200 dark:border-red-900">
          <div className="flex gap-3">
            <ClockIcon className="size-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">
                Payment Deadline: 21 Days
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                You have <strong>21 days from ticket issuance</strong> to pay your fine. After 21 days, tickets automatically convert to court summons requiring appearance. Failing to appear results in arrest warrants.
              </p>
            </div>
          </div>
        </div>

        {/* Online Payment Options */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
              <GlobeAltIcon className="size-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Online Payment (24/7)</h2>
              <Text>Pay anytime from anywhere with internet access</Text>
            </div>
          </div>

          <div className="space-y-6">
            {/* TAJ Portal */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">
                1. Tax Administration Jamaica (TAJ) Portal
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Website:</p>
                  <a
                    href="https://www.jamaicatax.gov.jm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    www.jamaicatax.gov.jm
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Steps:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>Visit the TAJ portal</li>
                    <li>Enter your ticket number and driver&apos;s license number</li>
                    <li>View outstanding fines</li>
                    <li>Add tickets to cart (can pay multiple at once)</li>
                    <li>Pay via Visa, MasterCard, or KeyCard</li>
                  </ol>
                </div>
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 border border-green-200 dark:border-green-900">
                  <div className="flex gap-2">
                    <CheckCircleIcon className="size-5 text-green-600 dark:text-green-400 shrink-0" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Available 24/7 with immediate confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Portal */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">
                2. TaxoExpress Portal
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Website:</p>
                  <a
                    href="https://taxoexpress.com/ticket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    taxoexpress.com/ticket
                  </a>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Alternative online payment service with similar functionality to the TAJ portal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
              <DevicePhoneMobileIcon className="size-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">TAJ Mobile App</h2>
              <Text>Pay on-the-go with no data charges</Text>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Platform:</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Available on Android devices</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Features:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>Same functionality as web portal</li>
                  <li>No data charges when using the app</li>
                  <li>Pay tickets on-the-go</li>
                  <li>Immediate payment confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Offline Payment */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950">
              <BuildingLibraryIcon className="size-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">In-Person Payment</h2>
              <Text>Visit offices across Jamaica</Text>
            </div>
          </div>

          <div className="space-y-6">
            {/* TAJ Offices */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">
                Tax Administration Jamaica Offices
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Locations:</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Multiple offices across Jamaica</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Hours:</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Monday - Friday, 8:30 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Payment Methods:</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Cash and card payments accepted</p>
                </div>
              </div>
            </div>

            {/* Paymaster */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">
                Paymaster Locations
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Private payment service providers at multiple retail sites islandwide
              </p>
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Payment Methods:</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Cash and card accepted</p>
              </div>
            </div>

            {/* Traffic Courts */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">
                Traffic Courts
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  For contested tickets or violations beyond the 21-day payment window
                </p>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Corporate Area:</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Traffic Court - South Camp Road, Kingston
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Regional:</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Parish Courts handle cases regionally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help & Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-6">Help & Support</h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">JCF Traffic Ticket Help Desk:</p>
                  <p className="text-zinc-600 dark:text-zinc-400">876-836-0270 or 876-382-0238</p>
                </div>
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">Traffic Amnesty Call Centre:</p>
                  <p className="text-zinc-600 dark:text-zinc-400">948-0411 (Monday-Friday, 8:00 AM - 4:00 PM)</p>
                </div>
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">TAJ Customer Care:</p>
                  <p className="text-zinc-600 dark:text-zinc-400">1-888-TAX-HELP (1-888-829-4357)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-4">Useful Links</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">Traffic Ticket Lookup:</p>
                  <a
                    href="https://trafficticketlookup.gov.jm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    trafficticketlookup.gov.jm
                  </a>
                </div>
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">Tax Administration Jamaica:</p>
                  <a
                    href="https://www.jamaicatax.gov.jm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    jamaicatax.gov.jm
                  </a>
                </div>
                <div>
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">Jamaica Constabulary Force:</p>
                  <a
                    href="https://jcf.gov.jm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    jcf.gov.jm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Warnings */}
        <section className="space-y-4">
          <div className="rounded-xl bg-yellow-50 dark:bg-yellow-950/20 p-6 border border-yellow-200 dark:border-yellow-900">
            <div className="flex gap-3">
              <ExclamationCircleIcon className="size-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  Consequences of Unpaid Tickets
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                  <li>Cannot renew driver&apos;s license</li>
                  <li>Cannot transfer vehicle titles</li>
                  <li>Cannot pay fitness and registration fees</li>
                  <li>Arrest warrants issued for non-compliance</li>
                  <li>Paying fines does NOT prevent demerit point suspension</li>
                </ul>
              </div>
            </div>
          </div>

          <Disclaimer type="payment" />
        </section>
      </main>
    </div>
  )
}
