const roles = [
  {
    title: 'trader',
  },
  {
    title: 'customer',
  },
];

const tokensArray = [
  {
    title: 'token for value',
  },
  {
    title: 'token for target',
  },
];

const imagesArray = [
  {
    title:
      'https://images.pexels.com/photos/7567550/pexels-photo-7567550.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to eat',
  },
  {
    title:
      'https://images.pexels.com/photos/6801872/pexels-photo-6801872.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to sleep',
  },
  {
    title:
      'https://images.pexels.com/photos/5583964/pexels-photo-5583964.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to dance',
  },
  {
    title:
      'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to eat',
  },
  {
    title:
      'https://images.pexels.com/photos/6771574/pexels-photo-6771574.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to eat',
  },
  {
    title:
      'https://images.pexels.com/photos/14348491/pexels-photo-14348491.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'i want to drink',
  },
];

const userNotifications = [
  {
    id: 1,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-25T11:38:50.735Z',
  },

  {
    id: 2,
    title: 'Your account credited successfully',
    message:
      'Your account number 18d966b1-4004-4d25-895e-874301363026 has been credited successfully with 1000.00 naira and this account has new balance of 231000.00.',
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-24T11:38:50.735Z',
  },

  {
    id: 3,
    title: 'Your account credited successfully',
    message:
      'Your account number e83afe03-c274-4b13-a35a-a7b1ce9a7d3e has been credited successfully with 1000.00 naira and this account has new balance of 430500.00.',
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-24T11:38:50.735Z',
  },

  {
    id: 4,
    title: 'Transfer successful',
    message:
      "You have successfully transferred #2200 from 8699751545 account to AYODEJI OLUBUNMI ADEBOLU's Access Bank account 0728453360.",
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-23T11:38:50.735Z',
  },

  {
    id: 5,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-23T11:38:50.735Z',
  },

  {
    id: 6,
    title: 'Transfer successful',
    message: 'You have successfully transferred 5000 to 6894944948 account.',
    is_read: false,
    is_viewed: false,
    created_at: '2024-12-22T11:38:50.735Z',
  },

  {
    id: 7,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-22T11:38:50.735Z',
  },

  {
    id: 8,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-22T11:38:50.735Z',
  },

  {
    id: 9,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-21T11:38:50.735Z',
  },

  {
    id: 10,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-20T11:38:50.735Z',
  },

  {
    id: 11,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-20T11:38:50.735Z',
  },

  {
    id: 12,
    title: 'Transfer successful',
    message: 'You have successfully transferred 5000 to 6894944948 account.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-20T11:38:50.735Z',
  },

  {
    id: 13,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-19T11:38:50.735Z',
  },

  {
    id: 14,
    title: 'Transfer successful',
    message: 'You have successfully transferred 3000 to 6894944948 account.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-19T11:38:50.735Z',
  },

  {
    id: 15,
    title: 'Transfer successful',
    message: 'You have successfully transferred 12000 to 6894944948 account.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-18T11:38:50.735Z',
  },

  {
    id: 16,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-18T11:38:50.735Z',
  },

  {
    id: 17,
    title: 'Account credited successfully',
    message:
      'Your account 4666869543 has been credited with the sum of 500 by Fola Adebolu..',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-18T11:38:50.735Z',
  },

  {
    id: 18,
    title: 'Your account credited successfully',
    message:
      'Your account number 4cd159b4-9454-4434-ad46-e93bf3dbeb37 has been credited successfully with 500.00 naira and this account has new balance of 190000.00.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-17T11:38:50.735Z',
  },

  {
    id: 19,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-15T11:38:50.735Z',
  },

  {
    id: 20,
    title: 'Your account credited successfully',
    message:
      'Your account number 18d966b1-4004-4d25-895e-874301363026 has been credited successfully with 1000.00 naira and this account has new balance of 231000.00.',
    is_read: true,
    is_viewed: true,
    created_at: '2024-12-11T14:38:50.735Z',
  },

  {
    id: 21,
    title: 'Image upload successful',
    message: 'You have successfully uploaded an image to your profile.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-13T11:38:50.735Z',
  },

  {
    id: 22,
    title: 'Your account credited successfully',
    message:
      'Your account number e83afe03-c274-4b13-a35a-a7b1ce9a7d3e has been credited successfully with 1000.00 naira and this account has new balance of 446000.00.',
    is_read: true,
    is_viewed: true,
    created_at: '2024-12-12T11:38:50.735Z',
  },

  {
    id: 23,
    title: 'Credit successful',
    message: 'You have successfully credited 1000 to 8699751545.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-11T11:38:50.735Z',
  },

  {
    id: 24,
    title: 'Your account credited successfully',
    message:
      'Your account number e83afe03-c274-4b13-a35a-a7b1ce9a7d3e has been credited successfully with 10000.00 naira and this account has new balance of 455000.00.',
    is_read: false,
    is_viewed: true,
    created_at: '2024-12-11T11:38:50.735Z',
  },

  {
    id: 25,
    title: 'Transfer successful',
    message:
      "You have successfully transferred #5000 from 8699751545 account to AYODEJI OLUBUNMI ADEBOLU's Access Bank account 0728453360.",
    is_read: true,
    is_viewed: true,
    created_at: '2024-12-11T11:38:50.735Z',
  },
];

export { roles, tokensArray, imagesArray, userNotifications };
