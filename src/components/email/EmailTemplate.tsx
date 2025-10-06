import * as React from 'react'

interface ContactEmailTemplateProps {
  name: string
  email: string
  phone?: string
  country: string
  orderNumber?: string
  message: string
}

export function EmailTemplate({
  name,
  email,
  phone,
  country,
  orderNumber,
  message
}: ContactEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        color: '#333'
      }}
    >
      <h2 style={{ color: '#0066cc' }}>Ny kontakthenvendelse</h2>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        <h3>Kontaktinformasjon:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td
                style={{ padding: '8px 0', fontWeight: 'bold', width: '30%' }}
              >
                Navn:
              </td>
              <td style={{ padding: '8px 0' }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>E-post:</td>
              <td style={{ padding: '8px 0' }}>
                <a href={`mailto:${email}`}>{email}</a>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Telefon:</td>
              <td style={{ padding: '8px 0' }}>{phone || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Land:</td>
              <td style={{ padding: '8px 0' }}>{country}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
                Ordrenummer:
              </td>
              <td style={{ padding: '8px 0' }}>{orderNumber || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: '20px',
          backgroundColor: '#fafafa',
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        <h3>Melding:</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>

      <hr
        style={{
          margin: '30px 0',
          border: 'none',
          borderTop: '1px solid #ddd'
        }}
      />
      <p style={{ fontSize: '12px', color: '#666' }}>
        Denne meldingen ble sendt fra kontaktskjemaet på utekos.no
      </p>
    </div>
  )
}
