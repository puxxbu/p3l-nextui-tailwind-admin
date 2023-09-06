import React from 'react';
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'AGE', uid: 'age', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'TEAM', uid: 'team' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const columnsAlbum = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'YEAR', uid: 'year', sortable: true },
  { name: 'TYPE', uid: 'type', sortable: true },
  { name: 'TOTALCOUNT', uid: 'totalCount', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Paused', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
];

export const users2 = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active',
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation',
  },
  {
    key: '5',
    name: 'Emily Collins',
    role: 'Marketing Manager',
    status: 'Active',
  },
  {
    key: '6',
    name: 'Brian Kim',
    role: 'Product Manager',
    status: 'Active',
  },
  {
    key: '7',
    name: 'Laura Thompson',
    role: 'UX Designer',
    status: 'Active',
  },
  {
    key: '8',
    name: 'Michael Stevens',
    role: 'Data Analyst',
    status: 'Paused',
  },
  {
    key: '9',
    name: 'Sophia Nguyen',
    role: 'Quality Assurance',
    status: 'Active',
  },
  {
    key: '10',
    name: 'James Wilson',
    role: 'Front-end Developer',
    status: 'Vacation',
  },
  {
    key: '11',
    name: 'Ava Johnson',
    role: 'Back-end Developer',
    status: 'Active',
  },
  {
    key: '12',
    name: 'Isabella Smith',
    role: 'Graphic Designer',
    status: 'Active',
  },
  {
    key: '13',
    name: 'Oliver Brown',
    role: 'Content Writer',
    status: 'Paused',
  },
  {
    key: '14',
    name: 'Lucas Jones',
    role: 'Project Manager',
    status: 'Active',
  },
  {
    key: '15',
    name: 'Grace Davis',
    role: 'HR Manager',
    status: 'Active',
  },
  {
    key: '16',
    name: 'Elijah Garcia',
    role: 'Network Administrator',
    status: 'Active',
  },
  {
    key: '17',
    name: 'Emma Martinez',
    role: 'Accountant',
    status: 'Vacation',
  },
  {
    key: '18',
    name: 'Benjamin Lee',
    role: 'Operations Manager',
    status: 'Active',
  },
  {
    key: '19',
    name: 'Mia Hernandez',
    role: 'Sales Manager',
    status: 'Paused',
  },
  {
    key: '20',
    name: 'Daniel Lewis',
    role: 'DevOps Engineer',
    status: 'Active',
  },
  {
    key: '21',
    name: 'Amelia Clark',
    role: 'Social Media Specialist',
    status: 'Active',
  },
  {
    key: '22',
    name: 'Jackson Walker',
    role: 'Customer Support',
    status: 'Active',
  },
  {
    key: '23',
    name: 'Henry Hall',
    role: 'Security Analyst',
    status: 'Active',
  },
  {
    key: '24',
    name: 'Charlotte Young',
    role: 'PR Specialist',
    status: 'Paused',
  },
  {
    key: '25',
    name: 'Liam King',
    role: 'Mobile App Developer',
    status: 'Active',
  },
];

const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Sr. Dev',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'C.M.',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'S. Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 6,
    name: 'Brian Kim',
    role: 'P. Manager',
    team: 'Management',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'brian.kim@example.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Michael Hunt',
    role: 'Designer',
    team: 'Design',
    status: 'paused',
    age: '27',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29027007d',
    email: 'michael.hunt@example.com',
  },
  {
    id: 8,
    name: 'Samantha Brooks',
    role: 'HR Manager',
    team: 'HR',
    status: 'active',
    age: '31',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e27027008d',
    email: 'samantha.brooks@example.com',
  },
  {
    id: 9,
    name: 'Frank Harrison',
    role: 'F. Manager',
    team: 'Finance',
    status: 'vacation',
    age: '33',
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'frank.harrison@example.com',
  },
  {
    id: 10,
    name: 'Emma Adams',
    role: 'Ops Manager',
    team: 'Operations',
    status: 'active',
    age: '35',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'emma.adams@example.com',
  },
  {
    id: 11,
    name: 'Brandon Stevens',
    role: 'Jr. Dev',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: 'brandon.stevens@example.com',
  },
  {
    id: 12,
    name: 'Megan Richards',
    role: 'P. Manager',
    team: 'Product',
    status: 'paused',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?img=10',
    email: 'megan.richards@example.com',
  },
  {
    id: 13,
    name: 'Oliver Scott',
    role: 'S. Manager',
    team: 'Security',
    status: 'active',
    age: '37',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'oliver.scott@example.com',
  },
  {
    id: 14,
    name: 'Grace Allen',
    role: 'M. Specialist',
    team: 'Marketing',
    status: 'active',
    age: '30',
    avatar: 'https://i.pravatar.cc/150?img=16',
    email: 'grace.allen@example.com',
  },
  {
    id: 15,
    name: 'Noah Carter',
    role: 'IT Specialist',
    team: 'I. Technology',
    status: 'paused',
    age: '31',
    avatar: 'https://i.pravatar.cc/150?img=15',
    email: 'noah.carter@example.com',
  },
  {
    id: 16,
    name: 'Ava Perez',
    role: 'Manager',
    team: 'Sales',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?img=20',
    email: 'ava.perez@example.com',
  },
  {
    id: 17,
    name: 'Liam Johnson',
    role: 'Data Analyst',
    team: 'Analysis',
    status: 'active',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?img=33',
    email: 'liam.johnson@example.com',
  },
  {
    id: 18,
    name: 'Sophia Taylor',
    role: 'QA Analyst',
    team: 'Testing',
    status: 'active',
    age: '27',
    avatar: 'https://i.pravatar.cc/150?img=29',
    email: 'sophia.taylor@example.com',
  },
  {
    id: 19,
    name: 'Lucas Harris',
    role: 'Administrator',
    team: 'Information Technology',
    status: 'paused',
    age: '32',
    avatar: 'https://i.pravatar.cc/150?img=50',
    email: 'lucas.harris@example.com',
  },
  {
    id: 20,
    name: 'Mia Robinson',
    role: 'Coordinator',
    team: 'Operations',
    status: 'active',
    age: '26',
    avatar: 'https://i.pravatar.cc/150?img=45',
    email: 'mia.robinson@example.com',
  },
];

const musics = {
  data: {
    artist: {
      discography: {
        albums: {
          totalCount: 15,
          items: [
            {
              releases: {
                items: [
                  {
                    id: '6Ar5HxNWXtvraqs7FI7bYq',
                    uri: 'spotify:album:6Ar5HxNWXtvraqs7FI7bYq',
                    name: 'Suzume (Motion Picture Soundtrack)',
                    type: 'ALBUM',
                    date: {
                      year: 2022,
                      isoString: '2022-11-10T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02bc16d1eefe86b079c8805f8f',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851bc16d1eefe86b079c8805f8f',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273bc16d1eefe86b079c8805f8f',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'cTNArLiRTqihJnY-_fQ-lw',
                      shareUrl:
                        'https://open.spotify.com/album/6Ar5HxNWXtvraqs7FI7bYq?si=cTNArLiRTqihJnY-_fQ-lw',
                    },
                    tracks: {
                      totalCount: 29,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '3FyR41ewiOZHop9rFnOZ1m',
                    uri: 'spotify:album:3FyR41ewiOZHop9rFnOZ1m',
                    name: 'Original Soundtrack of "The Last Ten Years"',
                    type: 'ALBUM',
                    date: {
                      year: 2022,
                      isoString: '2022-03-04T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e025cafe314823ed27c06dbbdff',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d000048515cafe314823ed27c06dbbdff',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b2735cafe314823ed27c06dbbdff',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'AoKSrcnpQfOK2jk7ZmuHYQ',
                      shareUrl:
                        'https://open.spotify.com/album/3FyR41ewiOZHop9rFnOZ1m?si=AoKSrcnpQfOK2jk7ZmuHYQ',
                    },
                    tracks: {
                      totalCount: 30,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '1fYi13JilVgZfmml6oTQt5',
                    uri: 'spotify:album:1fYi13JilVgZfmml6oTQt5',
                    name: 'FOREVER DAZE',
                    type: 'ALBUM',
                    date: {
                      year: 2021,
                      isoString: '2021-11-23T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02bbd75075f28711876b9fee2b',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851bbd75075f28711876b9fee2b',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273bbd75075f28711876b9fee2b',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'ABq_eyLuQmm6KZwduB7OBw',
                      shareUrl:
                        'https://open.spotify.com/album/1fYi13JilVgZfmml6oTQt5?si=ABq_eyLuQmm6KZwduB7OBw',
                    },
                    tracks: {
                      totalCount: 14,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '5xC3tDmG3LAyHh9wJf1Ujv',
                    uri: 'spotify:album:5xC3tDmG3LAyHh9wJf1Ujv',
                    name: '2+0+2+1+3+1+1= 10 years 10 songs',
                    type: 'ALBUM',
                    date: {
                      year: 2021,
                      isoString: '2021-03-11T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02fe2cd19a9e444fefb9297197',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851fe2cd19a9e444fefb9297197',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273fe2cd19a9e444fefb9297197',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'n3T4O7U0Re-Xc4OBCVCNag',
                      shareUrl:
                        'https://open.spotify.com/album/5xC3tDmG3LAyHh9wJf1Ujv?si=n3T4O7U0Re-Xc4OBCVCNag',
                    },
                    tracks: {
                      totalCount: 10,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '4hAlZU3JXoThQ3jnF4CGiZ',
                    uri: 'spotify:album:4hAlZU3JXoThQ3jnF4CGiZ',
                    name: 'Weathering With You -Complete Version-',
                    type: 'ALBUM',
                    date: {
                      year: 2019,
                      isoString: '2019-11-27T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02512668c8cf31d12749a6fa40',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851512668c8cf31d12749a6fa40',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273512668c8cf31d12749a6fa40',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'R7kwriKVRX-f6gAXBLCsQQ',
                      shareUrl:
                        'https://open.spotify.com/album/4hAlZU3JXoThQ3jnF4CGiZ?si=R7kwriKVRX-f6gAXBLCsQQ',
                    },
                    tracks: {
                      totalCount: 6,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '2BcCxJ3EWhsd4IyN8XJA3q',
                    uri: 'spotify:album:2BcCxJ3EWhsd4IyN8XJA3q',
                    name: 'Weathering With You',
                    type: 'ALBUM',
                    date: {
                      year: 2019,
                      isoString: '2019-07-19T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e023e2780c2283bbcb8f5d740d0',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d000048513e2780c2283bbcb8f5d740d0',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b2733e2780c2283bbcb8f5d740d0',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: '7DHCcwobT5KwuS-b377M1A',
                      shareUrl:
                        'https://open.spotify.com/album/2BcCxJ3EWhsd4IyN8XJA3q?si=7DHCcwobT5KwuS-b377M1A',
                    },
                    tracks: {
                      totalCount: 31,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '59jm6kUIwtwx5tk6jWOUMv',
                    uri: 'spotify:album:59jm6kUIwtwx5tk6jWOUMv',
                    name: 'ANTI ANTI GENERATION',
                    type: 'ALBUM',
                    date: {
                      year: 2018,
                      isoString: '2018-12-12T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e022d65935e4296e6c890f61bc7',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d000048512d65935e4296e6c890f61bc7',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b2732d65935e4296e6c890f61bc7',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'oqnajkKVSdCS8QysAOXDiQ',
                      shareUrl:
                        'https://open.spotify.com/album/59jm6kUIwtwx5tk6jWOUMv?si=oqnajkKVSdCS8QysAOXDiQ',
                    },
                    tracks: {
                      totalCount: 17,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '4msOF7XQKkdvBpvqmIONGW',
                    uri: 'spotify:album:4msOF7XQKkdvBpvqmIONGW',
                    name: 'Your Name. (Deluxe Edition / Original Motion Picture Soundtrack)',
                    type: 'ALBUM',
                    date: {
                      year: 2017,
                      isoString: '2017-03-10T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02f4f17e78872b6ef3e62c1c95',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851f4f17e78872b6ef3e62c1c95',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273f4f17e78872b6ef3e62c1c95',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'pOF40cH6SnqVa6Nc7J4zmQ',
                      shareUrl:
                        'https://open.spotify.com/album/4msOF7XQKkdvBpvqmIONGW?si=pOF40cH6SnqVa6Nc7J4zmQ',
                    },
                    tracks: {
                      totalCount: 26,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '5TZ0bVy0tqIriXse4qk1HY',
                    uri: 'spotify:album:5TZ0bVy0tqIriXse4qk1HY',
                    name: 'Human Bloom',
                    type: 'ALBUM',
                    date: {
                      year: 2016,
                      isoString: '2016-11-23T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e0285b0876389c92ac31f514593',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000485185b0876389c92ac31f514593',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b27385b0876389c92ac31f514593',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: '2HXdkSDzRa-petae4XvPqg',
                      shareUrl:
                        'https://open.spotify.com/album/5TZ0bVy0tqIriXse4qk1HY?si=2HXdkSDzRa-petae4XvPqg',
                    },
                    tracks: {
                      totalCount: 15,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '4qApTp9557qYZzRLEih4uP',
                    uri: 'spotify:album:4qApTp9557qYZzRLEih4uP',
                    name: 'Your Name.',
                    type: 'ALBUM',
                    date: {
                      year: 2016,
                      isoString: '2016-08-24T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02cbbbea7d8fcf057f65071a85',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851cbbbea7d8fcf057f65071a85',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273cbbbea7d8fcf057f65071a85',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'ZF-5AnOETYq18GOjavUVug',
                      shareUrl:
                        'https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP?si=ZF-5AnOETYq18GOjavUVug',
                    },
                    tracks: {
                      totalCount: 27,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '4akhlx4zsYqDDApjFP38m3',
                    uri: 'spotify:album:4akhlx4zsYqDDApjFP38m3',
                    name: 'Batsu to Maru to Tsumi to',
                    type: 'ALBUM',
                    date: {
                      year: 2013,
                      isoString: '2013-12-11T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02270be367238574dc8dbf506c',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851270be367238574dc8dbf506c',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273270be367238574dc8dbf506c',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'ZSEOqmiTRbOKvvaJLqqaUg',
                      shareUrl:
                        'https://open.spotify.com/album/4akhlx4zsYqDDApjFP38m3?si=ZSEOqmiTRbOKvvaJLqqaUg',
                    },
                    tracks: {
                      totalCount: 15,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '3b3tyPWcSOYy5SFC0bCUWP',
                    uri: 'spotify:album:3b3tyPWcSOYy5SFC0bCUWP',
                    name: 'Zettaizetsumei',
                    type: 'ALBUM',
                    date: {
                      year: 2011,
                      isoString: '2011-03-09T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02c0c53dcf5bb71d127b8eab7f',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851c0c53dcf5bb71d127b8eab7f',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273c0c53dcf5bb71d127b8eab7f',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'ofkmMNSlSnqyRgq4KVwOrA',
                      shareUrl:
                        'https://open.spotify.com/album/3b3tyPWcSOYy5SFC0bCUWP?si=ofkmMNSlSnqyRgq4KVwOrA',
                    },
                    tracks: {
                      totalCount: 14,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '3phjMsKsr6V1aicq04S3Ie',
                    uri: 'spotify:album:3phjMsKsr6V1aicq04S3Ie',
                    name: 'Arutokoroni no Teiri',
                    type: 'ALBUM',
                    date: {
                      year: 2009,
                      isoString: '2009-03-11T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02c7060d26f9965231182c156c',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851c7060d26f9965231182c156c',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273c7060d26f9965231182c156c',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: '5FqBB9NYRYq0qfv1gWrEsw',
                      shareUrl:
                        'https://open.spotify.com/album/3phjMsKsr6V1aicq04S3Ie?si=5FqBB9NYRYq0qfv1gWrEsw',
                    },
                    tracks: {
                      totalCount: 13,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '27mMMU3UZQbsCcAURmGvPP',
                    uri: 'spotify:album:27mMMU3UZQbsCcAURmGvPP',
                    name: 'RADWIMPS 4 ～おかずのごはん～',
                    type: 'ALBUM',
                    date: {
                      year: 2006,
                      isoString: '2006-12-06T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02c864d5603e04d0fe4faef74e',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851c864d5603e04d0fe4faef74e',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273c864d5603e04d0fe4faef74e',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'KcVLScSWQjmA_6c3CEO3Bg',
                      shareUrl:
                        'https://open.spotify.com/album/27mMMU3UZQbsCcAURmGvPP?si=KcVLScSWQjmA_6c3CEO3Bg',
                    },
                    tracks: {
                      totalCount: 14,
                    },
                  },
                ],
              },
            },
            {
              releases: {
                items: [
                  {
                    id: '5StzS3H3g6BwP5rpW4o49f',
                    uri: 'spotify:album:5StzS3H3g6BwP5rpW4o49f',
                    name: 'RADWIMPS 3 ~無人島に持っていき忘れた一枚~',
                    type: 'ALBUM',
                    date: {
                      year: 2006,
                      isoString: '2006-02-15T00:00:00Z',
                    },
                    coverArt: {
                      sources: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02db726790bd619f4a95b78f6e',
                          width: 300,
                          height: 300,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d00004851db726790bd619f4a95b78f6e',
                          width: 64,
                          height: 64,
                        },
                        {
                          url: 'https://i.scdn.co/image/ab67616d0000b273db726790bd619f4a95b78f6e',
                          width: 640,
                          height: 640,
                        },
                      ],
                    },
                    playability: {
                      playable: true,
                      reason: 'PLAYABLE',
                    },
                    sharingInfo: {
                      shareId: 'udzxJeX4R4Km04iTWO2mDQ',
                      shareUrl:
                        'https://open.spotify.com/album/5StzS3H3g6BwP5rpW4o49f?si=udzxJeX4R4Km04iTWO2mDQ',
                    },
                    tracks: {
                      totalCount: 12,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  extensions: [],
};

export { columns, columnsAlbum, users, statusOptions, musics };
