export const listQuoteTemplate = {
  name: "List Quote Template",
  content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Repair Quote</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header img {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #2563eb;
      margin-bottom: 10px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      color: #2563eb;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #e2e8f0;
      background-color: #f8fafc;
    }
    .total-row {
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
    }
    .footer p {
      margin-bottom: 0;
    }
    @page {
      size: A4;
      margin: 20mm;
    }
    @media print {
      body {
        margin: 0;
      }
      .header h1 {
        color: #2563eb !important;
      }
      .section h2 {
        color: #2563eb !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="/assets/images/logo1.png" alt="Company Logo">
    <h1>Repair Quote</h1>
    <div class="meta">
      <p><strong>Reference:</strong> {{referenceNumber}}</p>
      <p><strong>Date:</strong> {{date}}</p>
      <p><strong>Auditor:</strong> {{auditor_name}}</p>
      <p><strong>Supply Type:</strong> {{supplyType}}</p>
    </div>
  </div>

  <div class="section">
    <h2>Site Information</h2>
    <p><strong>Site Name:</strong> {{site_name}}</p>
    <p><strong>Company:</strong> {{company_name}}</p>
  </div>

  <div class="section">
    <h2>Damage Records</h2>
    <ul>
      {{#each damage_records}}
        <li>
          <strong>Reference:</strong> {{reference_number}}<br>
          <strong>Damage Type:</strong> {{damage_type}}<br>
          <strong>Risk Level:</strong> {{risk_level}}<br>
          <strong>Location:</strong> {{location_details}}<br>
          {{#if building_area}}<strong>Building/Area:</strong> {{building_area}}<br>{{/if}}
          <strong>Brand:</strong> {{brand}}<br>
          <strong>Recommendation:</strong> {{recommendation}}<br>
          {{#if notes}}<strong>Notes:</strong> {{notes}}<br>{{/if}}
          <strong>Product Cost:</strong> {{product_cost}}<br>
          {{#ifCond ../supplyType '!=' "Parts Only"}}
            <strong>Installation Cost:</strong> {{installation_cost}}<br>
          {{/ifCond}}
        </li>
      {{/each}}
    </ul>
  </div>

  <div class="section">
    <h2>Cost Summary</h2>
    <ul>
      <li>Total Materials Cost: <span class="total-row">{{totalMaterialsCost}}</span></li>
      {{#ifCond supplyType '!=' "Parts Only"}}
        <li>Total Installation Cost: <span class="total-row">{{totalInstallationCost}}</span></li>
      {{/ifCond}}
      <li>Subtotal: <span class="total-row">{{subtotal}}</span></li>
      <li>GST (10%): <span class="total-row">{{gst}}</span></li>
      <li><strong>Total (incl. GST):</strong> <span class="total-row">{{totalWithGst}}</span></li>
    </ul>
  </div>

  <div class="footer">
    <p>Thank you for your business.</p>
    <p>DMD Storage Group</p>
    <p>Contact: sales@dmd.com.au</p>
  </div>
</body>
</html>`
};
