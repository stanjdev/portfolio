import Head from 'next/head';
import Layout from '../../components/layout';

export default function GoodReads() {
  return (
    <Layout>
      <Head>
        <title>GoodReads: Case Study</title>
      </Head>

      <div className="header">
        <h1>GoodReads Reviews</h1>
        <h2>Book Reviews Web App</h2>
        <blockquote><em>"Create an account, log in, search for, and leave reviews for your favorite books!"</em></blockquote>
        <p><a href="https://react-goodreads.herokuapp.com/" target="_blank" rel="noopener noreferrer">Live</a> | <a href="https://github.com/stanjdev/goodreads" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </div>

      <figure className="center">
        <img src="/project_images/goodreads.png" alt="{name}" className="center"/>
        <figcaption>Clean and simple welcome page</figcaption>
      </figure>



      <div className="projectInfo">
        <div className="container__grey projectInfo__block">
          <h2>Project Brief:</h2>
          <p>Harvard CS50W Capstone Project</p>
        </div>

        <div className="container__grey projectInfo__block">
          <h2>Timeline:</h2>
          <p>August 2020 - October 2020</p>
        </div>

        <div className="container__grey projectInfo__block">
          <h2>Role / Skills:</h2>
          <p>Lead Developer</p>
        </div>
      </div>

      <div className="container container__grey">
        <h2>Technologies Used:</h2>
        <div className="technologies">
          <ul>
            <u>PERN Stack:</u>
            <li>PostgreSQL</li>
            <li>Express.js</li>
            <li>React</li>
            <li>Node.js</li>
            <li>JavaScript</li>
            <li>Local Storage, Session Storage</li>
            <li>GoodReads API</li>
            <li>Deployed to Heroku</li>
          </ul>
          <ul>
            <li>Redux</li>
            <li>React Router</li>
            <li>React Bootstrap</li>
            <li>SCSS</li>
            <li>Axios</li>

            <li>Converted from originally Python, Flask, Jinja2 project</li>
            <li>CRUD capabilities - users can <u>GET, POST, PUT, DELETE</u> their   
                own comment reviews of individual books</li>
          </ul>
        </div>
      </div>


      <section className="container">
          <h3>Summary:</h3>
          <li>Users can log in to search for books, leave reviews, edit and delete their reviews, and see average reviews and review counts per book from Goodreads API data.</li>
          <li>Express.js server-side fetch of Goodreads API endpoints as well as database queries using PostgreSQL for books, user reviews, and user login information.</li>
          <li>Books imported from a CSV file of 5000 books</li>
          <li>Environment variables stored via Heroku</li>

        <figure className="center">
          <img src="/project_images/goodreads/goodreads_search.png" className="center"/>
          <figcaption>Search via ISBN, title, or author of your favorite book!</figcaption>
        </figure>

        <figure className="center">
          <img src="/project_images/goodreads/goodreads_results.png" alt="results page" className="caseStudyImage center"/>
          <figcaption>Results page loaded</figcaption>
        </figure>

        <figure className="center">
          <img src="/project_images/goodreads/goodreads_book.png" alt="book details page" className="caseStudyImage center"/>
          <figcaption>Details per individual book imported from fetching from both PostgreSQL database and <a href="https://www.goodreads.com/api" target="_blank">GoodReads API</a> data</figcaption>
        </figure>
      </section>




      <section className="container">
        <h1>Challenges Faced: </h1>
      </section>


      <section className="container container__grey">
        <h2>Pre-rendering the "Details" HTML page first to display external fetched data</h2>
        <p>After deploying the production version to Heroku, when refreshing or GET requesting the 'details' page of 
        any book (/details/9958 route for example), I was stuck with a plain, white screen with only a JSON object of the API 
        response data for that book. My Express.js routes were catching all of the GET requests before React could load the index.html page, 
        therefore the application had no webpage to display the API data onto.</p>
        <p>I wanted my HTML to be pre-rendered in order for the fetched GoodReads API and database data to successfully "hydrate" and display on the page.</p>
        <p> To remedy this, I found a work-around on my server-side using the Express.js <code>res.sendFile(path, options)</code> method to pre-render 
        the template index.html file as the <code>path</code> argument, along with the API response data object in the <code>options</code> argument.</p>
        {/* 
        I needed to generate HTML for each page in advance, instead of having it all done by client-side JavaScript.
        
        CSR SSR Static Page thing? Pre-rendering. Hydration
        This is because the app is not pre-rendered into static HTML
 
        In hindsight, I realized this problem of needing to fetch certain data to before loading and populating the HTML template page can be solved by using frameworks such as Next.js.
        
        Using React 
        https://github.com/stanjdev/goodreads/issues/44
        */}

        <pre className="pre">
          <code >
{`// detailsRouter.js
let options = {
  headers: {
    'result': (results from GoodReads API fetch),
    'comment_list': (comments from the database fetch),
    'bookinfo': (book info from the database fetch)
  }
}

res.sendFile(path.join(__dirname, "../client/build/index.html"), options);
`}
          </code>
        </pre>
      </section>



      <section className="container container__grey">
        <h2>Deploying to Heroku with the Heroku Postgres database add-on</h2>
        <img src="https://miro.medium.com/max/700/1*PR3N41Yzq0bEQw9imFmrJQ.png" alt="Heroku Postgres" style={{margin: "0 auto"}}/>
        <p>
          Before finally deploying the application on Heroku for production, I installed the Heroku Postgres add-on to host the 
          PostgreSQL database for my users, books, and reviews. I made sure to include the <code>DATABASE_URL</code> environment variable
          provided by Heroku to link to the app's <code>process.env</code> and used conditional boolean logic to select either "deployment" or "production"
          mode configuration.
        </p>
        <p>This ensured the application was using either the "development mode" local database, or the "production mode" heroku hosted database.</p>

        <pre className="pre">
          <code >
  {`// db.js
const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
}

const prodConfig = {
  connectionString: process.env.DATABASE_URL // <-- heroku add-on Postgres database URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig)
`}
          </code>
        </pre>
      </section>



{/* User login stuff? */}
{/* CATCH ALL for dynamic routes, error page or login/search page redirection */}



      <section className="container">
        <h2>Final Result:</h2>
        <figure className="center">
          <figcaption>Leave a review, edit your review, and delete your review seamlessly!</figcaption>
            <img src="/project_images/gifs/goodreads-reviewing-books.gif" alt="goodreads gif" className="caseStudyImage center"/>
        </figure>
      </section>
      







      {/* <p>- screen recordings gifs as the thumbnails.</p>
      <p>- Code gists of interesting workarounds, yada yada</p>
      <p>
      show the best parts of it, write about it.

      present the important parts of the project.
      how much of did he do, etc. how much did previous developer or owner of website do
      they’ll be more confident of my capabilities,
      
      explain small things like user login permissions.
      single pages
      https://caseytang.myportfolio.com/
      https://marisachentakul.co/
      guide them through it. gists. snippets of code instead of design images, etc. to prove I’ve been thinking
      </p>

    <p>
    - Discuss anything written on your resume, and be able to go in-depth
    - Provide specific examples about what you did and the resulting impact
    - Critique yourself and share what you learned from a past situation
    - Talk about what you like about your current role and/or being a developer
    - Discuss what and why changes you would like to make
    </p> */}

    </Layout>
  )
}