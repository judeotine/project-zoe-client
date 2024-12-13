import React, { useState } from 'react';

const PledgeForm: React.FC = () => {
const [pledgeAmount, setPledgeAmount] = useState<string>('');
const [purpose, setPurpose] = useState<string>('');
const [paymentSchedule, setPaymentSchedule] = useState<string>('');
const [paymentMethod, setPaymentMethod] = useState<string>('');
const [notes, setNotes] = useState<string>('');

const handleSubmit = async (event: React.FormEvent) => {
event.preventDefault();

if (!pledgeAmount || !purpose || !paymentSchedule || !paymentMethod || isNaN(Number(pledgeAmount))) {
alert('Please fill in all required fields.');
return;
}

              try {
              const response = await fetch('/api/pledge', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
              pledgeAmount: parseFloat(pledgeAmount),
              purpose,
              paymentSchedule,
              paymentMethod,
              notes,
              }),
              });

              if (response.ok) {
        alert('Pledge submitted successfully!');
        setPledgeAmount('');
        setPurpose('');
        setPaymentSchedule('');
        setPaymentMethod('');
        setNotes('');
      } else {
        alert('Error submitting pledge.');
      }
    } catch (error) {
      console.error('Error submitting pledge:', error);
      alert('Error submitting pledge.');
    }
  };

              return (
              <form onSubmit={handleSubmit}>
              <h2>Make a Pledge</h2>
              <div>
        <label htmlFor="pledgeAmount">Pledge Amount:</label>
        <input
          type="number"
          id="pledgeAmount"
          value={pledgeAmount}
          onChange={(e) => setPledgeAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="purpose">Purpose/Category:</label>
        <select
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        >
          <option value="">Select Purpose</option>
          <option value="buildingFund">Building Fund</option>
          <option value="missions">Missions</option>
          <option value="generalFund">General Fund</option>
        </select>
      </div>
      <div>
        <label htmlFor="paymentSchedule">Payment Schedule:</label>
        <select
          id="paymentSchedule"
          value={paymentSchedule}
          onChange={(e) => setPaymentSchedule(e.target.value)}
          required
        >
          <option value="">Select Schedule</option>
          <option value="oneTime">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <label htmlFor="paymentMethod">Preferred Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select Method</option>
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="online">Online</option>
          <option value="online">Mobile Money</option>
        </select>
      </div>
      <div>
        <label htmlFor="notes">Optional Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button type="submit">Submit Pledge</button>
    </form>
  );
};

export default PledgeForm;
