class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :content            
      t.integer :project_id
      t.integer :user_id
      t.datetime :completed_at

      t.timestamps   
    end
  end
end
