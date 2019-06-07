<?php
/**
 * The generic page template
 *
 * @package Helipad
 */

get_header(); ?>

  <main id="primary" class="page">
    <div class="container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>

          <h1><?php the_title(); ?></h1>

			<?php the_content(); ?>

		<?php endwhile; ?>
    </div>
  </main>

<?php get_footer(); ?>
