import React from 'react'

import ImageAndText from '../../components/image-and-text'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import V3container from '../../components/v3-container'

export default function RecipesPage(props) {
  return (
    <Layout>
      <PageHeader text="Recipes" />
      <ImageAndText
        extraClass="recipe"
        alt="Potatoes"
        ctaLink=""
        ctaText=""
        imageUrl={'/images/fried-potato-wedges.jpg'}
      >
        <h3>Potatoes</h3>
        <p>
          Heat oil in a pot ... just enough oil to cover the potatoes ... and
          add your potatoes. Leave them there and that’s it. I don’t deal with
          soaking, blanching, freezing, or any of that. It takes about 10
          minutes to make a batch of perfect fries.
        </p>
      </ImageAndText>
      <ImageAndText
        extraClass="recipe"
        alt="Bone Broth"
        ctaLink=""
        ctaText=""
        imageUrl={'/images/bone-broth.jpg'}
      >
        <h3>Soups</h3>
        <div className="w-richtext">
          <p>I really love my soups. Here are some of my favorites</p>
          <ol role="list">
            <li>
              <strong>French Onion Soup</strong>
            </li>
            <li>
              <strong>Avgolemono</strong> - Greek Chicken, Lemon, and Egg Soup
            </li>
            <li>Chicken Noodle Soup</li>
          </ol>
        </div>
      </ImageAndText>
      <ImageAndText
        extraClass="recipe"
        alt="Japanese-curry-katsu"
        ctaLink=""
        ctaText=""
        imageUrl={'/images/Japanese-curry-katsu.jpg'}
      >
        <h3>Cutlets</h3>
        <div className="w-richtext">
          <p>
            Who doesn’t love a nice crispy, fried cutlet?! This is also really
            simple to make.
          </p>
          <ol role="list">
            <li>
              Choose your meat. Chicken breast, thigh, pork cutlet. Whatever.
            </li>
            <li>Make sure the meat is patted dry.</li>
            <li>
              Dip the meat in your choice of bread crumbs (I usually use Panko
              but can also use Italian style)
            </li>
            <li>
              Dip the meat in a bowl of beaten egg, with a little water mixed in
            </li>
            <li>Dip the meat in the bread crumbs again.</li>
          </ol>
          <p>
            Once you have your cutlet breaded, it’s best to put it straight into
            the frying oil. It usually needs to cook for about 3 or 4 minutes.
            Then it’s done.{' '}
          </p>
          <p>
            Serve over rice or pasta, with some sauce. Or perhaps a{' '}
            <strong>Japanese curry</strong>.
          </p>
          <p>
            For <strong>parmigana style cutlets</strong>, top with cheese and
            sauce and bake under the broiler until the cheese is bubbly and
            golden.
          </p>
        </div>
      </ImageAndText>
      <ImageAndText
        extraClass="recipe"
        alt="Sauteed bok choy"
        ctaLink=""
        ctaText=""
        imageUrl={'/images/sauteed-greens---2.jpg'}
      >
        <h3>Vegetables</h3>
        <div className="w-richtext">
          <p>
            There are three steps to perfect sauteed vegetables, every time.
          </p>
          <ol role="list">
            <li>
              Lots of garlic. I use 1 head (!!) for every 500g of vegetables.
            </li>
            <li>
              Salt. I like to use chicken base (Lee Kum Kee chicken powder)
              since it adds extra umami.
            </li>
            <li>Blanch the greens in boiling water for a few seconds.</li>
          </ol>
          <p>
            All you have to do is heat the pan really hot, add room-temperature
            oil to the hot pan, cook your garlic for a few seconds until crisp,
            add chicken powder or salt, and finally toss in your blanched
            vegetables. Saute just until everything is coated and then transfer
            to a clean plate. Couldn’t be easier!
          </p>
        </div>
        <div className="flex-h-wrap-container">
          {[
            'Hot pan +chicken powder. Brown it all.',
            'Add vegetables.',
            'Toss to coat, they may wilt a little bit. That’s OK.',
            'Transfer to a plate. You’re all done!',
          ].map((r, i) => (
            <div key={`bok${i}`} className="roommate-block">
              <img
                src={`/images/sauteed-greens---${i + 1}.jpg`}
                alt="Sauteed greens"
              />
              <div className="caption w-richtext">
                <p>{r}</p>
              </div>
            </div>
          ))}
        </div>
      </ImageAndText>
    </Layout>
  )
}
