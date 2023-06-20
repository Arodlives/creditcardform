"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IconCreditCard } from '@tabler/icons-react';
import "./cc.css"


const CreditCardForm: React.FC = () => {
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardMonth, setCardMonth] = useState<string>("");
  const [cardYear, setCardYear] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [cardLogo, setCardLogo] = useState<string>("");
  

  const handleCardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };
  
  
  const formatCardNumber = (value: string) => {
    const MAX_CARD_LENGTH = 16;
    const defaultPlaceholder = "";
    const typingPlaceholder = "################";
    const emptyPlaceholder = ""; // Empty placeholder
  
    // Remove non-digit characters Regex
    let digitsOnly = value.replace(/\D/g, "");
  
    // Trim exceeding characters
    digitsOnly = digitsOnly.slice(0, MAX_CARD_LENGTH);
  
    // Calculate remaining digits needed
    const remainingDigits = MAX_CARD_LENGTH - digitsOnly.length;
  
    // Fill remaining digits with placeholder #
    const placeholder =
      remainingDigits > 0 ? typingPlaceholder.substring(0, remainingDigits) : "";
  
    // Remove trailing space when the input is empty or contains only placeholders
    if (digitsOnly === "") {
      return emptyPlaceholder;
    }
  
    // Add space after every 4 digits
    let formattedValue = "";
    for (let i = 0; i < digitsOnly.length; i += 4) {
      const chunk = digitsOnly.substring(i, i + 4);
      formattedValue += chunk + " ";
    }
  
    // Remove trailing space
    formattedValue = formattedValue.trim();
  
    // Get the cursor position
    const inputElement = document.activeElement as HTMLInputElement;
    const cursorPosition = inputElement.selectionStart || 0;
  
    // Check if individual numbers are being deleted
    if (cursorPosition < value.length) {
      // Return empty string when individual numbers are deleted
      const deletedValue = value.slice(cursorPosition);
      const deletedDigits = deletedValue.replace(/\D/g, "");
      const remainingLength = digitsOnly.length - deletedDigits.length;
      if (remainingLength > 0) {
        formattedValue = formattedValue.slice(0, remainingLength);
      } else {
        formattedValue = emptyPlaceholder;
      }
      return formattedValue;
    }
  
    // Set the cursor position to the end of the formattedValue
    setTimeout(() => {
      inputElement.selectionStart = formattedValue.length;
      inputElement.selectionEnd = formattedValue.length;
    });
  
    return formattedValue + placeholder; // Return formattedValue with placeholder
  };
  
 
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, ""); // Remove non-digit characters
    const formattedValue = formatCardNumber(digitsOnly); // Format the card number
  
    setCardNumber(formattedValue);
  
    // Set the card logo based on the formatted card number
    if (digitsOnly.startsWith("4")) {
      setCardLogo("/assets/visa-logo.png");
    } else if (digitsOnly.startsWith("5")) {
      setCardLogo("/assets/mastercard-logo.png");
    } else if (digitsOnly.startsWith("6")) {
      setCardLogo("/assets/discover-logo.png");
    } else if (digitsOnly.startsWith("34") || digitsOnly.startsWith("37")) {
      setCardLogo("/assets/american-express.png");
    } else {
      setCardLogo("");
    }
  };


  const handleCardMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardMonth(e.target.value);
  };

  const handleCardYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardYear(e.target.value);
  };

  const handleCardCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_CVV_LENGTH = 3;
    const cvv = e.target.value;
    setCardCvv(cvv);
    // setCardCvv(e.target.value);
    setIsCardFlipped(cvv.length >= 1 && cvv.length <= MAX_CVV_LENGTH);
    // setIsCardFlipped(e.target.value.length === 1); // Flip the card when CVV has 1 digits greater than 0
  };



  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
    // Handle form submission logic here
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 bg-white rounded-lg shadow-lg">
        <div className={`credit-card ${isCardFlipped ? "flipped" : ""}`}>
          {/*FrontSide of Card*/}
          <div className="bg-gray-300 card-front rounded-xl">
  {/* Render the front side of the card */}
  <div className="image-container" style={{ position: 'absolute', right: '20px', top: '20px' }}>
    {cardLogo ? (
      <Image src={cardLogo} alt="Card Logo" width={50} height={60} />
    ) : (
      <IconCreditCard height={50} width={60} />
    )}
  </div>
  <div className="items-center justify-center text-center text-gray-500 rounded-lg h-400 w-400">
    {cardNumber ? (
      <div className="flex font-bold card-number-placeholder">
        {cardNumber} <br />
      </div>
    ) : (
      <>
        <div className="font-bold ">
          {/*  &nbsp; is an entity symbol  */}
          <div className="flex card-number-placeholder">####&nbsp;####&nbsp;####&nbsp;####</div>

          {/*Expire ❤️*/}
          <div
            className="items-center text-sm font-light text-black image-container"
            style={{ position: 'absolute', left: '265.5px', bottom: '55.5px' }}>
            Expires<br />
          </div>
          {/*CardMonth CardYear❤️ */}
          <div
            className="items-center font-bold text-black image-container"
            style={{ position: 'absolute', left: '265.5px', bottom: '30.5px' }}
          >
            {cardMonth || 'MM'}/{cardYear || 'YY'}<br />
          </div>
        </div>
        </>)}
        <div className="items-center font-medium text-black card-front__name image-container flex-nowrap"
    style={{ position: 'absolute', right: '265.5px', bottom: '30.5px' }}>{cardName || 'Card Holder'} 
        
        </div>
          </div>
        </div>

          
          <div className="card-back bg-slate-600">
            {/* Render the back side of the card */}
            <div className="card-back__stripe"></div>
            <div className="card-back__cvv">CVV: {cardCvv}</div>
          </div>
        </div>

        <br></br>
        {/* Input Fields */}
        <div className="mb-6">
          <label htmlFor="card-name" className="text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            type="text"
            name="card-name"
            id="card-name"
            placeholder="Enter cardholder name"
            value={cardName}
            onChange={handleCardNameChange}
            className="w-full px-3 py-2 mt-1 text-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="card-number" className="text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="w-full px-3 py-2 mt-1 text-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="card-month" className="text-sm font-medium text-gray-700">
            Expiry Month
          </label>
          <input
            type="text"
            name="card-month"
            id="card-month"
            placeholder="MM"
            maxLength={2}
            value={cardMonth}
            onChange={handleCardMonthChange}
            className="w-full px-3 py-2 mt-1 text-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="card-year" className="text-sm font-medium text-gray-700">
            Expiry Year
          </label>
          <input
            type="text"
            name="card-year"
            id="card-year"
            placeholder="YYYY"
            maxLength={4}
            value={cardYear}
            onChange={handleCardYearChange}
            className="w-full px-3 py-2 mt-1 text-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="card-cvv" className="text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            name="card-cvv"
            id="card-cvv"
            placeholder="Enter CVV"
            maxLength={3}
            value={cardCvv}
            onChange={handleCardCvvChange}
            className="w-full px-3 py-2 mt-1 text-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="mr-2"
          />
          <label htmlFor="remember-me" className="text-sm font-medium text-gray-700">
            Remember me
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Order Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;
