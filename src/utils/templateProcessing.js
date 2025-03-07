import Handlebars from 'handlebars';
import { processField } from './templateProcessing/fieldProcessor';
import { processConditionals } from './templateProcessing/conditionalProcessor';
import { formatCurrency } from './dateFormatting';
import { formatDate } from './formatters';

export const processTemplate = async (template, audit, damageRecords, brandPrices) => {
  if (!template?.content || !audit || !damageRecords) {
    console.error("Error processing template: Missing template, audit, or damageRecords data. Audit:", audit, "Damage Records:", damageRecords);
    return '';
  }

  try {
    // Register the formatCurrency helper
    Handlebars.registerHelper('formatCurrency', function(value) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);
    });

    // Register the eq helper
    Handlebars.registerHelper('eq', function (a, b) {
      return a === b;
    });

    // Register the ifCond helper
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case 'typeof':
          return (typeof v1 === v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });

    // Compile the template
    const compiledTemplate = Handlebars.compile(template.content);

    // Prepare the data for the template
    const data = {
      ...audit,
      damage_records: damageRecords,
      brandPrices: brandPrices
    };

    // Render the template
    const processedContent = compiledTemplate(data);
    return processedContent;
  } catch (error) {
    console.error('Error processing template:', error);
    return '';
  }
};
