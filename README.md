# Binance Pop-Up

This pop-up will allows you to send 2 orders easily on Binance (1 buy and 1 sell order).

**IMPORTANT :** <br/>
&emsp;-You'll need to install 2 Chrome Extensions (see the Installation part) <br/>
&emsp;-You'll need to create an API key on Binance (see the Installation part) <br/>
&emsp;-You can only trade in USDT for now

<br/>

## Demo
When you open Binance, this pop-up appears :

![image](https://user-images.githubusercontent.com/80652315/158794758-da56fb19-8e42-49c6-9ab2-5686e0a5d342.png)

When you open the pop-up :

![image](https://user-images.githubusercontent.com/80652315/158795390-686405e4-bef1-47f9-b358-20ea69547e3a.png)

On the first load of the page, the script detects the crypto you want to trade and the current price. <br/>
Then, a buying and a selling price are added in the two inputs below the current price. <br/>
They are calculated with a percentage: <br/>
&emsp;-0.2% of the current price for buying price <br/>
&emsp;-0.3% of the current price for selling price

**Note that the prices in the inputs doesn't follow the price on Binance when it changes, it's only on the first load of the page**

You can move the pop-up where you want on the page by maintaining you click on the "+" or "-". <br/>
The new position you choose will be store in the local storage of your browser.

<br/>

## Installation

### STEP 1: Create an API key on Binance. <br/>
To do this, follow this few steps:

**Hover your profil icon in the top right corner and click on API management**<br/>
![First step](https://user-images.githubusercontent.com/80652315/158799361-312f3d31-ab5e-4eac-9150-ec9e5843d193.png) <br/>
You can now create your API key with the name you want.

#### **Copy you API key and your secret key, we'll need it later**

<br/>

**After that, click on "Edit restrictions" and allow "Enable Spot & Margin Trading"**<br/>
For more security, you should activate "restrict access to trusted IPs only" and add your IP adress.<br/>
![Second step](https://user-images.githubusercontent.com/80652315/158801713-c55914e8-6b1a-4a80-97bc-8136f71b41b3.png)

You can now save your changes and quit this page.

<br/>

### STEP 2: Install the chrome extension "Allow CORS"

#### Why do we need to install this ? <br/>
When you'll try to send orders with Binance API, you'll be block by CORS policy and you won't be able to send orders. <br/>
You'll get this kind of errors : <br/>
![image](https://user-images.githubusercontent.com/80652315/158804573-9afe079d-9404-4b39-831e-ac169af7f04b.png) <br/>
Thanks to this extension, the CORS policy will be passed and our pop-up will work !

<br/>

**All you need to do is to install this extension :**<br/>
![image](https://user-images.githubusercontent.com/80652315/158802869-e7a44b87-0b06-4ea8-99ea-34af7942be67.png)

**Open the options page :** <br/>
![Third step](https://user-images.githubusercontent.com/80652315/158805030-1fc1bd6a-f7e2-48b9-9dbb-066f26201ff0.png)

**And check the box of the second option :**
![image](https://user-images.githubusercontent.com/80652315/158805222-191b25c6-9f31-4ea2-80d1-c6feefaa7cbe.png)


**And then you need to activate the extension :**<br/>
When the "C" is grey it means that the extension is not active. <br/>
![image](https://user-images.githubusercontent.com/80652315/158805548-402c4d83-2623-4dbe-894b-64b7836549c2.png) <br/>
Click on the "C" or on "Toggle ON". <br/>
![image](https://user-images.githubusercontent.com/80652315/158805444-00b0f31d-22d8-4a91-bfe1-7ceb7d00f7f3.png)

The extension is active ! We can now go to step 3 !

<br/>

### STEP 3: Install the chrome extension "Scripty"

This extension will allow us to add automatically Javascript in a webpage. <br/>
![image](https://user-images.githubusercontent.com/80652315/158823435-a0e0e77c-5454-45fc-8539-90aa4742cb80.png)

You can now create a new Script by clicking on the extension in your extension bar. <br/>
Name your script and then **Copy and paste the app.js from this repository in the "Javascript Code" box**. <br/>

**You now need to replace this lines by your binance API keys** <br/>
![Fourth step](https://user-images.githubusercontent.com/80652315/158825045-37636bfd-add1-4fd8-b617-5a9932343cf5.png)

**Below the Javascript code, add this options** <br/>

*Note: here the code will only execute on "binance.com/en/trade", but if you use Binance in an other language you must replace the language in the URL ---->
Example: binance.com/es/trade for spanish*

Congrats 🎉 ! You can now use the pop-up !
