classdef ProjectileAppDraft5 < matlab.apps.AppBase 

 

% Properties that correspond to app components 

properties (Access = public) 

UIFigure matlab.ui.Figure 

ControlPanel matlab.ui.container.Panel 

LaunchButton matlab.ui.control.Button 

GravitySwitch matlab.ui.control.Switch 

GravitySwitchLabel matlab.ui.control.Label 

AngleField matlab.ui.control.NumericEditField 

AngleSlider matlab.ui.control.Slider 

AngleLabel matlab.ui.control.Label 

VelocityField matlab.ui.control.NumericEditField 

VelocitymsSlider matlab.ui.control.Slider 

VelocitymsSliderLabel matlab.ui.control.Label 

DifficultyDropDown matlab.ui.control.DropDown 

DifficultyDropDownLabel matlab.ui.control.Label 

LevelText matlab.ui.control.TextArea 

LevelTextAreaLabel matlab.ui.control.Label 

NextTargetButton matlab.ui.control.Button 

Lamp matlab.ui.control.Lamp 

StatusField matlab.ui.control.EditField 

UIAxes matlab.ui.control.UIAxes 

end 

 

%% Methods Start  

methods (Access = private) 

%% Function Start  

function results = plotapp(app,velocity,theta) 

% Declaring Global Variables  

global targetbottom targettop targetdistance Missed Hit Level  

%% Difficulty Setup Start 

% Converting Difficulty Dropdown Into a String 

difficulty = string(app.DifficultyDropDown.Value);  

% Limits and Tolerances for Each Difficulty 

if difficulty == "Easy" 

xlimit = 5; 

ylimit = 2.5; 

elseif difficulty == "Medium" 

xlimit = 10; 

ylimit = 5; 

else 

xlimit = 20; 

ylimit = 10; 

end 

%% Difficulty Setup End 

%% Gravity Setup Start 

% Converting Gravity Switch Into a String 

gravity = string(app.GravitySwitch.Value);  

% Gravity Switch Values 

if gravity == "On" 

g = 9.81; 

else 

g = 0; 

end 

%% Gravity Setup End 

%% Position/Velocity/Time Setup Start 

% Initial X- and Y- Position Set to Zero 

xi = 0;  

yi = 0; 

% Velocity Component Values From Chosen Velocity and Angles 

v_x = velocity*cosd(theta); 

v_y = velocity*sind(theta);  

% Sets Total Time for Run Determined from Difficulty Limits  

totaltime = xlimit/v_x;  

% Sets Extra Runtime if Velocity is Above 15 to meet Tolerance  

if app.VelocityField.Value >= 15 || app.VelocityField.Value <= 25 

time = (0:0.0065:totaltime)'; 

tolerance = 0.075; 

else 

time = (0:0.0075:totaltime)'; 

tolerance = 0.05; 

end 

% Output of X- and Y- Positions 

xf = xi + v_x.*time; 

yf = yi + v_y.*time - 0.5*g*(time.^2); 

%% Position/Velocity/Time Setup End 

%% Constraints Setup Start 

% TargetHit Constraint 

% If the absolute value of the target distance and output x 

% value is less than the tolerance AND the output y value is 

% within the target top and bottom range, then criteria is set 

% to "Hit." Output Graph will only graph to time of Target Hit. 

for j = 1:length(time) % Target Hit Constraint 

if abs(targetdistance-xf(j,1)) <= tolerance && yf(j,1) >= targetbottom && yf(j,1) <= targettop 

totaltime = time(j,1); 

if app.VelocityField.Value >= 15 || app.VelocityField.Value <= 25 

time = (0:0.0065:totaltime)'; 

else 

time = (0:0.0075:totaltime)';  

end 

xf = xi + v_x.*time; 

yf = yi + v_y.*time - 0.5*g*(time.^2); 

Status = "Hit"; 

break 

% Top Wall Hit Constraint  

% If the output y value is greater than or equal to the y 

% upper y limit, then the output graph will only show up  

% until the time of impact of the Top Wall. Criteria is  

% set to "Missed." 

elseif yf(j,1) >= ylimit  

totaltime = time(j-1,1); 

if app.VelocityField.Value >= 15 || app.VelocityField.Value <= 25 

time = (0:0.0065:totaltime)'; 

else 

time = (0:0.0075:totaltime)';  

end 

xf = xi + v_x.*time; 

yf = yi + v_y.*time - 0.5*g*(time.^2); 

Status = "Missed"; 

break 

% End Wall Hit Constraint  

% If the output x value is greater than or equal to the x 

% limit, then the output graph will only show up until the 

% time of impact of the End Wall. Criteria is set to 

% "Missed." 

elseif xf(j,1) >= xlimit  

totaltime = time(j-1,1); 

if app.VelocityField.Value >= 15 || app.VelocityField.Value <= 25 

time = (0:0.0065:totaltime)'; 

else 

time = (0:0.0075:totaltime)';  

end 

xf = xi + v_x.*time; 

yf = yi + v_y.*time - 0.5*g*(time.^2); 

Status = "Missed"; 

else 

Status = "Missed"; 

end 

end 

% Bottom Wall Hit Constraint 

% If the output y value is less than or equal the y lower  

% limit 0 then the output graph will only show up until the 

% time of impact of the End Wall. Criteria is set to 

% "Missed." 

for j = 2:length(time)  

if yf(j,1) <= 0  

totaltime = time(j-1,1); 

if app.VelocityField.Value >= 15 || app.VelocityField.Value <= 25 

time = (0:0.0065:totaltime)'; 

else 

time = (0:0.0075:totaltime)';  

end 

xf = xi + v_x.*time; 

yf = yi + v_y.*time - 0.5*g*(time.^2); 

Status = "Missed"; 

break 

end 

end 

%% Constraints Setup End 

 

%% Target/Projectile Plot Start 

plot(app.UIAxes,[targetdistance targetdistance],[targetbottom targettop]); 

hold(app.UIAxes,'On') 

comet(app.UIAxes,xf,yf)  

%% Target/Projectile Plot End 

%% Status Criteria Start 

% Every time the target is hit, the level increases, and missed 

% value is reset. This criteria is set up until the completion 

% of level 10. 

if Status == "Hit" && Hit < 9 % Sets Increaing Level Condition Until Completion of Level 10 

app.StatusField.Value = 'Target Hit!'; 

app.Lamp.Color = "g"; 

pause(1) 

app.NextTargetButtonPushed 

hold(app.UIAxes,'Off') 

Missed = 0; 

Hit = Hit + 1; 

Level = Level + 1; 

app.LevelText.Value = num2str(Level);  

% Every time the target is missed, the missed value increases 

% by 1. This criteria is set up until the after the second 

% miss. 

elseif Status == "Missed" && Missed ~= 2 % Sets Missing Criteria Up Until Failure 

app.StatusField.Value = 'You Missed...'; 

app.Lamp.Color = "r"; 

Missed = Missed + 1; 

% Once the target is missed for the 3rd time, the game resets 

% and the player is brought back to Difficulty = Easy. 

elseif Status == "Missed" && Missed == 2 % Resets Game If Missed Three Times 

app.StatusField.Value = 'You Lost...'; 

app.Lamp.Color = [0,0,0]; 

Hit = 0; 

Missed = 0; 

Level = 1; 

pause(3) 

app.LevelText.Value = num2str(1); 

app.DifficultyDropDown.Value = 'Easy'; 

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

app.NextTargetButtonPushed 

% Once the target is hit on Level 10, then the difficulty  

% changes if on a lower difficulty or you win the game if  

% already on Hard. 

elseif Status == "Hit" && Hit == 9 % Sets Level Criteria to Change Difficulty or Win (9) 

if difficulty == "Easy" 

app.StatusField.Value = 'Moving to Medium...'; 

elseif difficulty == "Medium" 

app.StatusField.Value = 'Moving to Hard...';  

else 

app.StatusField.Value = 'You Won!'; 

end 

app.Lamp.Color = [0.93,0.69,0.13]; 

app.LevelText.Value = ''; 

pause(3) 

if difficulty == "Easy" 

app.DifficultyDropDown.Value = 'Medium'; 

app.NextTargetButtonPushed 

Missed = 0; 

Hit = 0; 

Level = 1; 

app.LevelText.Value = num2str(Level);  

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

elseif difficulty == "Medium" 

app.DifficultyDropDown.Value = 'Hard'; 

app.NextTargetButtonPushed 

Missed = 0; 

Hit = 0; 

Level = 1; 

app.LevelText.Value = num2str(Level);  

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

end 

end 

%% Status Criteria Start 

end  

%% Function End 

end  

%% Methods End 

 

% Callbacks that handle component events 

methods (Access = private) 

 

% Code that executes after component creation 

function startupFcn(app) 

% Starting Level View 

app.LevelText.Value = num2str(1); 

 

%% Startup Function Start 

% Calling Global Variables 

global targetbottom targettop targetdistance Missed Hit Level 

% Switching Gravity to On 

app.GravitySwitch.Value = "On"; 

% Chaning Level Value to String  

app.LevelText.Value = num2str(Level); 

% Turning Difficulty Dropdown into String 

difficulty = string(app.DifficultyDropDown.Value); 

%% Difficulty Setup Start  

% Setting all variables to initial condition with specified 

% limits. Target Distances are always from half of the x limit  

% to 90% of the x limit. % Ranges for the target is from 90%  

% to 10% of the y limit. 

% For Easy, target length is 20% of the y limit. 

if difficulty == "Easy" 

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 5; 

ylimit = 2.5; 

targetlength = (0.2*ylimit); % 0.5 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 2.5 to 4.5 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); % 0.75 to 2.25 

targetbottom = targettop-targetlength;  

% For Medium, target length is 15% of the y limit. 

elseif difficulty == "Medium" 

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 10; 

ylimit = 5; 

targetlength = (0.125*ylimit); % 0.75 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 5 to 9 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength;  

% For Hard, target length is 20% of the y limit. 

else 

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 20; 

ylimit = 10; 

targetlength = (0.075*ylimit); % 0.75 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 5 to 9 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength;  

end 

%% Difficulty Setup End 

 

%% Target Plot Start 

plot(app.UIAxes,[targetdistance targetdistance],[targetbottom targettop]); 

axis(app.UIAxes,[0,xlimit,0,ylimit]) 

%% Target Plot End  

%% Startup Function End 

end 

 

% Button pushed function: LaunchButton 

function LaunchButtonPushed(app, event) 

%% Launch Button Function Start 

% Any value from the velocity and angle sliders will be 

% inputted into the private function 

velocity = app.VelocitymsSlider.Value; 

theta = app.AngleSlider.Value; 

% Sending to Private Function 

plotapp(app,velocity,theta) 

%% Launch Button Function End 

end 

 

% Value changing function: VelocitymsSlider 

function VelocitymsSliderValueChanging(app, event) 

%% Velocity Slider Function Start 

% Any changing value to the velocity slider will be translated 

% to the field to its right. 

changingVelocityValue = event.Value;  

app.VelocityField.Value = changingVelocityValue; 

%% Velocity Slider Function End 

end 

 

% Value changing function: AngleSlider 

function AngleSliderValueChanging(app, event) 

%% Angle Slider Function Start 

% Any changing value to the angle slider will be translated  

% to the field to its right. 

changingAngleValue = event.Value; 

app.AngleField.Value = changingAngleValue; 

%% Angle Slider Function End  

end 

 

% Button pushed function: NextTargetButton 

function NextTargetButtonPushed(app, event) 

%% Next Target Function Start  

% Calling Global Variables 

global targetbottom targettop targetdistance Missed 

% Converting the Difficulty Dropdown to a String 

difficulty = string(app.DifficultyDropDown.Value);  

% Setting Status Field Underneath Graph to a blank box and 

% chaning the lamp color to white after pressing 

app.StatusField.Value = ""; 

app.Lamp.Color = [1,1,1]; 

Missed = 0; 

%% Difficulty Assigning Start 

if difficulty == "Easy" 

xlimit = 5; 

ylimit = 2.5; 

targetlength = (0.2*ylimit); % 0.5 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 2.5 to 4.5 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); % 0.75 to 2.25 

targetbottom = targettop-targetlength; 

elseif difficulty == "Medium" 

xlimit = 10; 

ylimit = 5; 

targetlength = (0.125*ylimit); % 0.75 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 5 to 9 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength; 

else  

xlimit = 20; 

ylimit = 10; 

targetlength = (0.075*ylimit);  

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1);  

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength; 

end 

%% Difficulty Assigning End 

%% Target Plot Start  

hold(app.UIAxes,'Off') 

plot(app.UIAxes,[targetdistance targetdistance],[targetbottom targettop]); 

axis(app.UIAxes,[0,xlimit,0,ylimit]) 

%% Target Plot End 

%% Next Target Function End  

end 

 

% Value changed function: DifficultyDropDown 

function DifficultyDropDownValueChanged(app, event) 

%% Difficulty Dropdown Function Start 

% Calling Global Variables 

global targetbottom targettop targetdistance Missed Hit Level 

% Converting Difficulty Dropdwon into a String 

difficulty = string(app.DifficultyDropDown.Value); 

%% Difficulty Assigning Start 

if difficulty == "Easy" 

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 5; 

ylimit = 2.5; 

targetlength = (0.2*ylimit); % 0.5 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 2.5 to 4.5 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); % 0.75 to 2.25 

targetbottom = targettop-targetlength; 

app.LevelText.Value = num2str(1); 

hold(app.UIAxes,'Off') 

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

elseif difficulty == "Medium" 

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 10; 

ylimit = 5; 

targetlength = (0.125*ylimit); % 0.75 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1); % 5 to 9 

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength; 

app.LevelText.Value = num2str(1); 

hold(app.UIAxes,'Off') 

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

else  

Missed = 0; 

Hit = 0; 

Level = 1; 

xlimit = 20; 

ylimit = 10; 

targetlength = (0.075*ylimit); 

targetdistance = (xlimit/2) + (0.8*xlimit/2).*rand(1,1);  

targettop = (0.1*ylimit+targetlength) + (0.8*ylimit-targetlength).*rand(1,1); 

targetbottom = targettop-targetlength;  

app.LevelText.Value = num2str(1); 

hold(app.UIAxes,'Off') 

app.StatusField.Value = ''; 

app.Lamp.Color = [1,1,1]; 

end 

%% Difficulty Assigning End 

 

%% Target Plot Start 

plot(app.UIAxes,[targetdistance targetdistance],[targetbottom targettop]); 

axis(app.UIAxes,[0,xlimit,0,ylimit])  

%% Target Plot End 

 

%% Difficulty Dropdown Function End 

end 

 

% Value changed function: VelocityField 

function VelocityFieldValueChanged(app, event) 

%% Velocity Field Function Start 

% When value of velocity field is changed the velocity slider 

% is automatically updated to that value. 

value = app.VelocityField.Value; 

app.VelocitymsSlider.Value = value; 

%% Velocity Field Function End  

end 

 

% Value changed function: AngleField 

function AngleFieldValueChanged(app, event) 

%% Angle Field Function Start  

% When value of angle field is changed the angle slider 

% is automatically updated to that value. 

value = app.AngleField.Value; 

app.AngleSlider.Value = value;  

%% Angle Field Function End  

end 

end 

 

% Component initialization 

methods (Access = private) 

 

% Create UIFigure and components 

function createComponents(app) 

 

% Create UIFigure and hide until all components are created 

app.UIFigure = uifigure('Visible', 'off'); 

app.UIFigure.Position = [100 100 640 480]; 

app.UIFigure.Name = 'MATLAB App'; 

 

% Create UIAxes 

app.UIAxes = uiaxes(app.UIFigure); 

xlabel(app.UIAxes, 'Distance [m]') 

ylabel(app.UIAxes, 'Height [m]') 

zlabel(app.UIAxes, 'Z') 

app.UIAxes.XLim = [0 10]; 

app.UIAxes.YLim = [0 10]; 

app.UIAxes.ZLim = [0 1]; 

app.UIAxes.Position = [292 132 334 278]; 

 

% Create StatusField 

app.StatusField = uieditfield(app.UIFigure, 'text'); 

app.StatusField.HorizontalAlignment = 'center'; 

app.StatusField.Position = [370 90 124 22]; 

 

% Create Lamp 

app.Lamp = uilamp(app.UIFigure); 

app.Lamp.Position = [509 91 20 20]; 

app.Lamp.Color = [1 1 1]; 

 

% Create NextTargetButton 

app.NextTargetButton = uibutton(app.UIFigure, 'push'); 

app.NextTargetButton.ButtonPushedFcn = createCallbackFcn(app, @NextTargetButtonPushed, true); 

app.NextTargetButton.Position = [409 51 100 22]; 

app.NextTargetButton.Text = 'Next Target'; 

 

% Create LevelTextAreaLabel 

app.LevelTextAreaLabel = uilabel(app.UIFigure); 

app.LevelTextAreaLabel.HorizontalAlignment = 'center'; 

app.LevelTextAreaLabel.Position = [422 439 34 22]; 

app.LevelTextAreaLabel.Text = 'Level'; 

 

% Create LevelText 

app.LevelText = uitextarea(app.UIFigure); 

app.LevelText.HorizontalAlignment = 'center'; 

app.LevelText.Position = [463 439 33 22]; 

app.LevelText.Value = {'1'}; 

 

% Create ControlPanel 

app.ControlPanel = uipanel(app.UIFigure); 

app.ControlPanel.TitlePosition = 'centertop'; 

app.ControlPanel.Title = 'Control Panel'; 

app.ControlPanel.Position = [14 18 260 447]; 

 

% Create DifficultyDropDownLabel 

app.DifficultyDropDownLabel = uilabel(app.ControlPanel); 

app.DifficultyDropDownLabel.HorizontalAlignment = 'right'; 

app.DifficultyDropDownLabel.Position = [27 370 51 22]; 

app.DifficultyDropDownLabel.Text = 'Difficulty'; 

 

% Create DifficultyDropDown 

app.DifficultyDropDown = uidropdown(app.ControlPanel); 

app.DifficultyDropDown.Items = {'Easy', 'Medium', 'Hard'}; 

app.DifficultyDropDown.ValueChangedFcn = createCallbackFcn(app, @DifficultyDropDownValueChanged, true); 

app.DifficultyDropDown.Position = [93 370 137 22]; 

app.DifficultyDropDown.Value = 'Easy'; 

 

% Create VelocitymsSliderLabel 

app.VelocitymsSliderLabel = uilabel(app.ControlPanel); 

app.VelocitymsSliderLabel.HorizontalAlignment = 'center'; 

app.VelocitymsSliderLabel.FontSize = 10; 

app.VelocitymsSliderLabel.Position = [1 305 64 16]; 

app.VelocitymsSliderLabel.Text = 'Velocity [m/s]'; 

 

% Create VelocitymsSlider 

app.VelocitymsSlider = uislider(app.ControlPanel); 

app.VelocitymsSlider.Limits = [5 25]; 

app.VelocitymsSlider.MajorTicks = [5 10 15 20 25]; 

app.VelocitymsSlider.MajorTickLabels = {'5', '10', '15', '20', '25'}; 

app.VelocitymsSlider.ValueChangingFcn = createCallbackFcn(app, @VelocitymsSliderValueChanging, true); 

app.VelocitymsSlider.MinorTicks = [7.5 12.5 17.5 22.5]; 

app.VelocitymsSlider.Position = [74 322 124 3]; 

app.VelocitymsSlider.Value = 5; 

 

% Create VelocityField 

app.VelocityField = uieditfield(app.ControlPanel, 'numeric'); 

app.VelocityField.ValueChangedFcn = createCallbackFcn(app, @VelocityFieldValueChanged, true); 

app.VelocityField.Position = [217 302 35 22]; 

 

% Create AngleLabel 

app.AngleLabel = uilabel(app.ControlPanel); 

app.AngleLabel.HorizontalAlignment = 'center'; 

app.AngleLabel.FontSize = 10; 

app.AngleLabel.Position = [1 221 55 13]; 

            app.AngleLabel.Text = 'Angle [°]'; 

 

            % Create AngleSlider 

            app.AngleSlider = uislider(app.ControlPanel); 

            app.AngleSlider.Limits = [0 45]; 

            app.AngleSlider.ValueChangingFcn = createCallbackFcn(app, @AngleSliderValueChanging, true); 

            app.AngleSlider.Position = [63 236 135 3]; 

 

            % Create AngleField 

            app.AngleField = uieditfield(app.ControlPanel, 'numeric'); 

            app.AngleField.ValueChangedFcn = createCallbackFcn(app, @AngleFieldValueChanged, true); 

            app.AngleField.Position = [217 216 35 22]; 

 

            % Create GravitySwitchLabel 

            app.GravitySwitchLabel = uilabel(app.ControlPanel); 

            app.GravitySwitchLabel.HorizontalAlignment = 'center'; 

            app.GravitySwitchLabel.Position = [108 93 43 22]; 

            app.GravitySwitchLabel.Text = 'Gravity'; 

 

            % Create GravitySwitch 

            app.GravitySwitch = uiswitch(app.ControlPanel, 'slider'); 

            app.GravitySwitch.Position = [106 130 45 20]; 

 

            % Create LaunchButton 

            app.LaunchButton = uibutton(app.ControlPanel, 'push'); 

            app.LaunchButton.ButtonPushedFcn = createCallbackFcn(app, @LaunchButtonPushed, true); 

            app.LaunchButton.Position = [79 33 100 22]; 

            app.LaunchButton.Text = 'Launch!'; 

 

            % Show the figure after all components are created 

            app.UIFigure.Visible = 'on'; 

        end 

    end 

 

    % App creation and deletion 

    methods (Access = public) 

 

        % Construct app 

        function app = ProjectileAppDraft5 

 

            % Create UIFigure and components 

            createComponents(app) 

 

            % Register the app with App Designer 

            registerApp(app, app.UIFigure) 

 

            % Execute the startup function 

            runStartupFcn(app, @startupFcn) 

 

            if nargout == 0 

                clear app 

            end 

        end 

 

        % Code that executes before app deletion 

        function delete(app) 

 

            % Delete UIFigure when app is deleted 

            delete(app.UIFigure) 

        end 

    end 

end 

 
