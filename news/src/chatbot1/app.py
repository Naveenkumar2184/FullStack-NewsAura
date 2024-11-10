import google.generativeai as genai
from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

GOOGLE_API_KEY = 'AIzaSyCarN4yxPKWw9UiiCVsx0H0c_MWJbHjLV8'  
genai.configure(api_key=GOOGLE_API_KEY)

messages = [
    {"role": "system", "content": "Hi I am Your helpful assistant!"}
]

# Dictionary with predefined responses
predefined_responses = {
"Weather": "How can I view weather updates on the platform?\"You can view real-time weather updates by navigating to the 'Weather' section of the platform, where we provide detailed forecasts based on your location or selected city.",
  "Stock Market": "How can I stay updated with stock market trends?\"The platform provides real-time stock market data through an integrated API, where you can track live stock prices, market trends, and financial news. Navigate to the 'Stock Market' section to get the latest updates and analysis.",
  "Razorpay - Payment Integration": "How can I make payments using Razorpay?\"Payments on the platform can be made securely through Razorpay. To make a payment, simply select your subscription plan or service, and choose Razorpay as your payment option. You will be redirected to Razorpay's secure payment gateway to complete your transaction.",
  "Subscription Plan": "What subscription plans are available on the platform?\"We offer several subscription plans tailored to your needs:\nBasic Plan: Access to basic news categories and updates.\nPremium Plan: Unlock exclusive content, early access to breaking news, and advanced features like custom news feeds and notifications.\nUltimate Plan: Get unlimited access to all categories, ad-free browsing, priority customer support, and other premium features.\nTo subscribe, choose your desired plan from the 'Subscription' section and complete the payment through Razorpay."}

@app.route('/')
def index():
    return render_template('index.html', messages=messages)

@app.route('/send', methods=['POST'])
def send():
    user_message = request.form['message']
    if user_message:
        messages.append({"role": "user", "content": user_message})
        if user_message in predefined_responses:
            reply = predefined_responses[user_message]
        else:
            model = genai.GenerativeModel('gemini-pro')
            try:
                response = model.generate_content(user_message)
                reply = response.text
            except Exception as e:
                reply = f"Error: {str(e)}"
        messages.append({"role": "assistant", "content": reply})
    return redirect(url_for('index'))

@app.route('/clear')
def clear():
    global messages
    messages = [
        {"role": "system", "content": "Hi i am your helpful assistant!"}
    ]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
