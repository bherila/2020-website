import Container from '@/components/container'

export default function Page() {
  return (
    <Container>
      <BuyNowButton />
    </Container>
  )
}

function BuyNowButton() {
  return (
    <div
      style={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '259px',
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '-2px 10px 5px rgba(0, 0, 0, 0)',
        borderRadius: '10px',
        fontFamily: 'SQ Market, SQ Market, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ padding: '20px' }}>
        <a
          target="_blank"
          href="https://checkout.square.site/merchant/5170N93FK2SE4/checkout/3GQ3ACLAURLKM7FAUGNP7NEC?src=embed"
          style={{
            display: 'inline-block',
            fontSize: '18px',
            lineHeight: '48px',
            height: '48px',
            color: '#ffffff',
            minWidth: '212px',
            backgroundColor: '#006aff',
            textAlign: 'center',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1) inset',
            borderRadius: '6px',
          }}
        >
          Buy now
        </a>
      </div>
    </div>
  )
}
