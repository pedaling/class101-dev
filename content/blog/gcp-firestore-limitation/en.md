---
title: Characteristics and Limitations of Google Cloud Platform's Firestore
date: '2019-07-24T04:35:23.448Z'
thumbnail: '/images/thumbnails/firestore.jpg'
description: ''
author: 'donut'
tags: ['gcp', 'firestore', 'firebase']
---
When ClASS101 started to set up a business, only a few developers were able to provide the service. Thus, by using GCP's Firestore (Google Cloud Platform's Firestore), we launched the service just in one week without building a proper server. Now, ClASS101 become popular and the time has come to let the old system go. Let us look through the GCP's Firestore that developers truly loved. 

Firestore is a key-value store, which does not require concerns about expandability problems such as scale-up or scale-down. Obviously, we need to pay on time unless all the Firestore requests that overpassed the free plan limits will be rejected. In Firestore, SDKs are documented at various platforms, react-native is an open-source and react-native-firebase is also well prepared. Therefore, we can say that Firestore is a great tool in the early stage of service with few development resources. However, as the service was expanded, developers started to feel the limits and craved for more service, more essential functions, and database model expansion. 

Limitations of GCP's Firestore

1. Korea region is not available
2. Transaction limits
3. Slow

The first limitation of GCP's Firestore is that there is a no GCP Korea region, while the major users are located in Korea. Thus, this problem had caused a bottleneck of service quality until the company moved the database to another region. As previously mentioned, in the early stage of the service, all the operational systems like web, mobile, and back-office are closely related to Firestore, and it caused big trouble. Furthermore, in GCP, as it was not possible to move the data automatically to another region, the developers could not shift the data location from Korea to other Asia regions either. Naturally, Firestore became a legacy during the process of planning a server construction.

Secondly, Firestore has a transaction limit. The most fatal aspect is that only one transaction can be done per second in a document. The developers were not far-sighted enough to think of the problem at the beginning. Therefore, now we check constraints in advance especially about the logic that needs some transaction. 

Lastly, Firestore is slow. Commonly we just call it as ‘heavy'. Between several reasons, a typical drawback of the service is that there is no projection function, which makes it possible to get only necessary fields from relevant documents when a query is operated in the client SDK. Thus, the client needed to download all the data if the relevant document is big. As this process has a concern on not only an original document size but also the basic overhead that Firestore SDK has, it seemed much slower than a proper procedure. Besides, unlike a simple query, it is difficult to query a document of a complex model. These constraints had become burdens to clients, and developers had to use inefficient query as the time goes by. Besides, Redux was adopted at the moment, and the mixture of Redux and the inefficient Firestore query structure lead to poor UX. 

Though Firestore has a NoSQL data model as a key-value store, developers were bothered to think whether the normalization promotes better performance. Eventually, CLASS101 constructed a new server while the company started to make an automatic accounting system in their service portfolio. We used stacks such as Node.js, Typescript, Apollo GraphQL, Atlas MongoDB and AWS Elastic Beanstalk, and simultaneously clients also utilized Apollo Client. We deleted all the Redux relevant modules like Redux-form, and actively embraced MobX and Formik. With going through a period of transition, now CLASS101 has become independent from Firestore. 

Finally, we have overcome the limitations of FIresotre though we had undergone many trial and errors while adopting new stack technologies. The development environment, code quality has become much better, and we are doing refactoring by deleting useless codes with utilizing React Hooks. In the next section, I will explain more about a server development and an adoption process of a new technology stack by the clients. 

