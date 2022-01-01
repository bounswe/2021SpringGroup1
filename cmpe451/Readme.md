# Backend Endpoints

<details>
<summary><strong> Json-LD Vocab </strong></summary>

  ```
  {
    "@context": {
      "@vocab": "http://schema.org/",
      "user_name": "name",
      "email": "email",
      "name": "name",
      "description": "description",
      "community_image_url":"image",
      "moderator" : {
        "@id": "http://schema.org/Person",
          "@type": "@id",
          "id": "identifier"
      },
      "Isjoined": {
        "@id": "http://schema.org/memberOf",
          "@type": "Boolean"
      },
      "poster" : "author",
      "community" : "identifier",
      "title" : "headline",
      "post_template": "identifier",
      "created_date" : "dateCreated",
      "data_field_templates" : {
        "@id": "http://schema.org/CreativeWork",
          "@type": "@id",
          "name" : "name",
          "type" : "DataType",
          "additional_content": "accessibilityFeature",
          "reference_name": "alternateName"
      }
    }
  }
  ```
</details>


<details>
  <summary><strong> Activity Streams </strong></summary>

  * Create Post <br>
  ```
  {
      "@context": "https://www.w3.org/ns/activitystreams",
      "summary": "Johnny created a post",
      "type": "Create",
      "actor": {
          "type": "Person",
          "name": "Johnny"
      },
      "object":{
          "summary": "A Post",
          "type": "Post",
          "id": "1",
          "content": "This is a simple post",
      },
      "to": [ "http://protopost.org/communities/Turkey_Meeting_Community" ]
  }
  ```

  * Create Post Template <br>
  ```
  {
      "@context": "https://www.w3.org/ns/activitystreams",
      "summary": "Johnny created a post template",
      "type": "Create",
      "actor": {
          "type": "Person",
          "name": "Johnny"
      },
      "object":{
          "summary": "A post template for community 1",
          "type": "Post Template",
          "id": "1",
          "content": "This is a post template for location and event sharing",
      },
      "to": [ "http://protopost.org/communities/Turkey_Meeting_Community" ]
  }
  ```

  * Delete Post <br>
  ```
  {
    "@context": "https://www.w3.org/ns/activitystreams",
    "summary": "Johnny delete his post",
    "type": "Delete",
    "actor": {
      "type": "Person",
      "user_name": "Johnny"
    },
    "object": "http://protopost.org/Turkey_Meeting_Community/post-29",
    "origin": {
      "type": "Community",
      "name": "Turkey_Meeting_Community"
    }
  }
  ```

  * Create Community <br>
  ```
  {
      "@context": "https://www.w3.org/ns/activitystreams",
      "summary": "Johnny created a community",
      "type": "Create",
      "actor": {
          "type": "Person",
          "name": "Johnny"
      },
      "object":{
          "summary": "A Community",
          "type": "Community",
          "id": "1",
          "content": "This is a community",
      }
  }
  ```
</details>

<details>
  <summary><strong> Json-LD Example Responses</strong></summary>
  
   * User <br>
  ```
  {
	  "@context" : "http://schema.org/",
	  "@type" : "Person",
	  "user_name" : "Johnny Bell",
	  "email" : "johnnybell@example.com"
  }
  ```
  
  * Community <br>
  ```
  {
    "@context": "http://schema.org/", 
    "@type": "Organization",
    "name" :"Community 1",
    "description" : "Community 1 description",
    "community_image_url" : "http://image.jpg",
    "moderator": {
      "id ": 3
    },
    "foundingDate": "1-1-2021",
    "isJoined" : "True"
  }
  ```
  
  * Post <br>
  ```
  {
    "@context": "http://schema.org/", 
    "@type": "SocialMediaPosting",
    "author" : {
      "@type" : "Person",
      "name" : "Johnny Bell",
    },
    "title": "Title of Post 1",
    "created_date" : "1-1-2021 13:00",
    "publisher" : {
      "@type" : "Organization",
      "name" : "Community X"
    },
    "post_template" : "5"
  }
  ```
  
</details>
