class Todo < ActiveRecord::Base
  attr_accessible :content, :order, :done, :id
  belongs_to :tag

  def to_json(options = {})
    super(options.merge(:only => [ :id, :content, :order, :done ]))
  end
end
