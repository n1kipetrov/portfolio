import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'your-project-id', // You'll get this from Sanity
  dataset: 'production', // or the name of your dataset
  apiVersion: '2023-09-30', // Use today's date or the version you prefer
  useCdn: true, // Set to false if you want to ensure fresh data
});
