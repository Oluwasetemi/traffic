interface DisclaimerProps {
  type?: 'offences' | 'payment' | 'general'
}

export function Disclaimer({ type = 'general' }: DisclaimerProps) {
  const getContent = () => {
    switch (type) {
      case 'offences':
        return {
          text: 'This information has been extracted programmatically from official government websites and may not be complete or up-to-date. For official and authoritative information, please refer to the',
          links: [
            { href: 'https://jcf.gov.jm', label: 'Jamaica Constabulary Force' },
            { href: 'https://trafficticketlookup.gov.jm', label: 'Traffic Ticket Lookup Portal' },
          ],
        }
      case 'payment':
        return {
          text: 'This payment information has been extracted from official government websites and may not be complete or up-to-date. For the most current payment options and official information, please visit',
          links: [
            { href: 'https://www.jamaicatax.gov.jm', label: 'jamaicatax.gov.jm' },
          ],
          additionalText: 'or contact TAJ Customer Care at 1-888-TAX-HELP.',
        }
      default:
        return {
          text: 'This information has been extracted from official government websites and may not be complete or up-to-date. For official information, please visit',
          links: [
            { href: 'https://trafficticketlookup.gov.jm', label: 'Traffic Ticket Lookup Portal' },
          ],
        }
    }
  }

  const content = getContent()

  return (
    <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-6 border border-amber-200 dark:border-amber-900">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        <strong className="font-semibold text-amber-900 dark:text-amber-200">Disclaimer:</strong>{' '}
        {content.text}{' '}
        {content.links.map((link, index) => (
          <span key={link.href}>
            {index > 0 && (index === content.links.length - 1 ? ' or the ' : ', ')}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              {link.label}
            </a>
            {index === content.links.length - 1 && type === 'offences' && '.'}
          </span>
        ))}
        {content.additionalText && ` ${content.additionalText}`}
      </p>
    </div>
  )
}
