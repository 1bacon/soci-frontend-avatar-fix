let adminFirstTimeSignup = {
  dom: document.currentScript.closest('soci-route'),
  init: () => {
    soci.registerPage(adminFirstTimeSignup)
    adminFirstTimeSignup.dom.querySelector('form').addEventListener('submit', e => {
      e.preventDefault()
    })
  },
  onActivate: () => {
    document.title = "Nonio - Choose Your Account Type"
    adminFirstTimeSignup.loadStripe()
  },
  onDeactivate: () => {
  },
  loadStripe: async () => {
    adminFirstTimeSignup.stripe = await soci.stripe
    let elements = adminFirstTimeSignup.stripe.elements()
    let currentStyles = getComputedStyle(document.documentElement)
    adminFirstTimeSignup.card = elements.create('card', {
      style: {
        base: {
          iconColor: currentStyles.getPropertyValue('--base-text'),
          color: currentStyles.getPropertyValue('--base-text'),
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
          lineHeight: '38px',
          fontSize: '14px',
          ':-webkit-autofill': {
            color: currentStyles.getPropertyValue('--brand-text')
          },
          '::placeholder': {
            color: currentStyles.getPropertyValue('--base-text-subtle')
          }
        },
        invalid: {
          iconColor: currentStyles.getPropertyPriority('--error-text'),
          color: currentStyles.getPropertyPriority('--error-text')
        }
      }
    })
    adminFirstTimeSignup.card.on('change', adminFirstTimeSignup.cardError)
    adminFirstTimeSignup.card.mount('#admin-first-time-signup #card-element')

    //TODO https://stripe.com/docs/billing/subscriptions/fixed-price#create-subscription
  },
  cardError: event => {
    let displayError = document.getElementById('card-element-errors')
    if (event.error) {
      displayError.textContent = event.error.message
      console.log(event.error)
    } else {
      displayError.textContent = ''
    }
  },
  chooseFree: () => {
    soci.postData('user/choose-free-account').then(result => {
      let button = adminFirstTimeSignup.dom.querySelector('soci-button.free-button')
      if(result === true){
        button?.success()
        setTimeout(()=>{
          window.history.pushState(null, null, '/#all')
          window.dispatchEvent(new CustomEvent('link'))
        }, 1000)
      }
      else {
        button?.error()
      }
    })
  },
  chooseSupporter: () => {
    soci.postData('stripe/create-customer').then(result => {
      let button = adminFirstTimeSignup.dom.querySelector('soci-button.supporter-button')
      if(result === true) {
        button?.success()
        let column = adminFirstTimeSignup.dom.querySelector('.column.supporter')
        column.toggleAttribute('active', true)
        column.style.height = (column.offsetHeight - 2) + 'px'
        setTimeout(()=>{
          column.style.height = column.querySelector('.title').offsetHeight + column.querySelector('.payment').offsetHeight
        }, 1)
      }
      else {
        button?.error()
      }
    })
  },
  subscribe: () => {
    let billingName = adminFirstTimeSignup.dom.querySelector('form input[name="name"]').value
    let priceId = "price_1JpOwmH4gvdXgbs5uGPiaLb2"
    adminFirstTimeSignup.stripe.createPaymentMethod({
      type: 'card',
      card: adminFirstTimeSignup.card,
      billing_details: {
        name: billingName,
      },
    })
    .then(result => {
      if(result.error){
        adminFirstTimeSignup.cardError(result)
      }
      else {
        adminFirstTimeSignup.createSubscription({
          paymentMethodId: result.paymentMethod.id,
          priceId: priceId
        })
      }
    })
  },
  createSubscription: ({paymentMethodId, priceId}) => {
    console.log(paymentMethodId)
    let button = adminFirstTimeSignup.dom.querySelector('.subscribe-button')
    return (
      soci.postData('stripe/subscription/create', {
        paymentMethodId: paymentMethodId,
        priceId: priceId,
      })
      // If the card is declined, display an error to the user.
      .then((result) => {
        if (result.error) {
          // The card had an error when trying to attach it to a customer.
          throw result
        }
        return result
      })
      // Normalize the result to contain the object returned by Stripe.
      // Add the additional details we need.
      .then((result) => {
        return {
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          subscription: result,
        };
      })
      // Some payment methods require a customer to be on session
      // to complete the payment process. Check the status of the
      // payment intent to handle these actions.
      //.then(handlePaymentThatRequiresCustomerAction)
      // If attaching this card to a Customer object succeeds,
      // but attempts to charge the customer fail, you
      // get a requires_payment_method error.
      //.then(handleRequiresPaymentMethod)
      // No more actions required. Provision your service for the user.
      .then((result) => {
        console.log(result)
        button.success()
        setTimeout(()=>{
          window.history.pushState(null, null, '/#all')
          window.dispatchEvent(new CustomEvent('link'))
        }, 1000)
      })
      .catch((error) => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        console.log('oh fuck')
        console.log(error)
        button.error()
        //showCardError(error)
      })
    )
  }
}

document.addEventListener('DOMContentLoaded', adminFirstTimeSignup.init)