  <div class='container'>
    <a href="https://github.com/arnaudmanaranche/Hunt-Issue">
      <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png">
    </a>
    <div id='logo'><img src="<?php plugins_url( '../../assets/img/logo.png', __FILE__ ) ?>"></div>
    <input type='text' id='newTodo' placeholder='<?php _e( 'Add new issue...', 'test' );?>'>
    <div id='tasks'>
      <?php _e( 'Loading...', 'test' );?>
    </div>
    <div>
      <button id='clearCompletedTasks' class='disabled'>
        <?php _e( 'Clear all done issues', 'test' );?>
      </button>
    </div>
    <p id='report'>
      <a href='https://github.com/arnaudmanaranche/Hunt-Issue/issues' target='_blank'>
        <?php _e( 'Report a bug', 'test' );?>
      </a>
    </p>
  </div>