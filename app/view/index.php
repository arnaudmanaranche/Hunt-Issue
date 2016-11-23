  <div class='container'>
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