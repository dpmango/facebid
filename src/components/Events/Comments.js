import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loading from '../Helpers/Loading';
import Comment from './Comment';

class Comments extends Component {

  render(){
    const { comments, userId } = this.props

    if ( !comments ){
      return <Loading />
    }
    return(
      <div className={'e-card__comments' + ( userId ? " is-logined" : "" )}>
        {comments.map(comment => (
          <Comment
            onReplyClick={this.props.onReplyClick}
            key={comment.id}
            data={comment} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, null)(Comments);
