import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    emotionList = () => {
        return Object.entries(this.props.emotions).map(function(mapentry) {
            return (
                <tr>
                <td>{mapentry[0]}</td>
                <td>{mapentry[1]}</td>
                </tr>
            );
        });
    }

    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                this.emotionList()
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
